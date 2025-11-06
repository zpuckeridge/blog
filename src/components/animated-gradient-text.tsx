import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export default function AnimatedGradientText({ text, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex animate-text-gradient bg-[200%_auto] bg-linear-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-clip-text text-transparent",
        className
      )}
    >
      {text}
    </span>
  );
}
