import { SIGNATURE_PATH_DATA } from "./signature-path-data";

const pathProps = {
  fill: "none" as const,
  pathLength: 1,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
};

const SignaturePathSegment = ({
  startIndex,
  paths,
}: {
  paths: readonly (typeof SIGNATURE_PATH_DATA)[number][];
  startIndex: number;
}) => (
  <>
    {paths.map(({ className, d, strokeWidth }, index) => (
      <path
        key={className}
        className="signature-path"
        d={d}
        {...pathProps}
        style={{ animationDelay: `${(startIndex + index) * 0.03}s` }}
        strokeWidth={strokeWidth}
      />
    ))}
  </>
);

/** Path elements for the animated signature SVG */
export const SignaturePaths = () => (
  <g className="dark:fill-white">
    <SignaturePathSegment
      paths={SIGNATURE_PATH_DATA.slice(0, 14)}
      startIndex={0}
    />
    <SignaturePathSegment
      paths={SIGNATURE_PATH_DATA.slice(14, 28)}
      startIndex={14}
    />
    <SignaturePathSegment
      paths={SIGNATURE_PATH_DATA.slice(28, 42)}
      startIndex={28}
    />
    <SignaturePathSegment
      paths={SIGNATURE_PATH_DATA.slice(42, 56)}
      startIndex={42}
    />
  </g>
);
