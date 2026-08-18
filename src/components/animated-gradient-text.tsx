import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

const AnimatedGradientText = ({ text, className }: Props) => (
  <span
    className={cn(
      "inline-flex animate-text-gradient bg-[200%_auto] bg-linear-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-clip-text text-transparent",
      className
    )}
  >
    {text}
  </span>
);

export default AnimatedGradientText;
