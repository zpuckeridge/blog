export const linkClassNames = {
  default:
    "group inline-block max-w-full whitespace-nowrap px-1 text-sm text-muted-foreground leading-[inherit] hover:bg-muted",
  highlighted:
    "group inline-block max-w-full whitespace-nowrap px-1 leading-[inherit] bg-muted hover:bg-muted/80",
} as const;

export type LinkVariant = keyof typeof linkClassNames;
