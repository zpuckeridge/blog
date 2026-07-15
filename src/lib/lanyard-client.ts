import type { LanyardPresence } from "@/lib/lanyard-status";

const WS_URL = "wss://api.lanyard.rest/socket";
const REST_URL = "https://api.lanyard.rest/v1/users";
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_BASE_MS = 1_000;
const DEFAULT_HEARTBEAT_MS = 30_000;

type PresenceHandler = (presence: LanyardPresence) => void;

interface LanyardSocketMessage {
  op?: number;
  t?: string;
  d?: LanyardPresence & {
    heartbeat_interval?: number;
    user_id?: string;
  };
}

export const fetchLanyardPresence = async (
  userId: string
): Promise<LanyardPresence | null> => {
  try {
    const response = await fetch(
      `${REST_URL}/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: LanyardPresence;
    };

    return payload.success && payload.data ? payload.data : null;
  } catch {
    return null;
  }
};

export const subscribeLanyardPresence = (
  userId: string,
  onPresence: PresenceHandler
): (() => void) => {
  let socket: WebSocket | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let disposed = false;
  let reconnectAttempts = 0;

  const clearHeartbeat = () => {
    if (heartbeatTimer !== null) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  };

  const clearReconnect = () => {
    if (reconnectTimer !== null) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  };

  const send = (payload: unknown) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  };

  const scheduleReconnect = () => {
    if (disposed || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      return;
    }

    const delay = RECONNECT_BASE_MS * 2 ** reconnectAttempts;
    reconnectAttempts += 1;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, delay);
  };

  const handlePresence = (presence: LanyardPresence) => {
    reconnectAttempts = 0;
    onPresence(presence);
  };

  const connect = () => {
    if (disposed) {
      return;
    }

    clearHeartbeat();
    clearReconnect();

    if (socket) {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onclose = null;
      socket.onerror = null;
      socket.close();
      socket = null;
    }

    socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      let message: LanyardSocketMessage;

      try {
        message = JSON.parse(String(event.data)) as LanyardSocketMessage;
      } catch {
        return;
      }

      if (message.op === 1) {
        const interval = message.d?.heartbeat_interval ?? DEFAULT_HEARTBEAT_MS;

        send({
          op: 2,
          d: { subscribe_to_id: userId },
        });

        clearHeartbeat();
        heartbeatTimer = setInterval(() => {
          send({ op: 3 });
        }, interval);
        return;
      }

      if (message.op !== 0 || !message.d) {
        return;
      }

      if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        handlePresence(message.d);
      }
    };

    socket.onclose = () => {
      clearHeartbeat();
      if (!disposed) {
        scheduleReconnect();
      }
    };

    socket.onerror = () => {
      socket?.close();
    };
  };

  void fetchLanyardPresence(userId).then((presence) => {
    if (presence && !disposed) {
      onPresence(presence);
    }
  });

  connect();

  return () => {
    disposed = true;
    clearHeartbeat();
    clearReconnect();

    if (socket) {
      socket.onclose = null;
      socket.close();
      socket = null;
    }
  };
};
