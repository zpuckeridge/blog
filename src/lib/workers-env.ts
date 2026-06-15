import { env as cfEnv } from "cloudflare:workers";

import { env as devEnv } from "./cloudflare-workers-dev";

export const workersEnv = import.meta.env.DEV ? devEnv : cfEnv;
