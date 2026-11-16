export type ListenSource = "apple" | "lanyard";

export const parseListenSource = (value: unknown): ListenSource | undefined => {
  if (value === "apple" || value === "lanyard") {
    return value;
  }

  return undefined;
};
