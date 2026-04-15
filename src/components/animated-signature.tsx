import "@/components/animated-signature.css";
import { SignaturePaths } from "./signature-paths";

export default function AnimatedSignature() {
  return (
    <svg
      aria-label="Signature"
      height="152"
      role="img"
      viewBox="87.312 61.102 387.438 197.909"
      width="130"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="#ffffff00"
        points="0,0 0,340 558,340 558,0"
        stroke="none"
      />
      <SignaturePaths />
    </svg>
  );
}
