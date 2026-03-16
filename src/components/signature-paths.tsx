import { SIGNATURE_PATH_DATA } from "./signature-path-data";

const pathProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
};

const SignaturePathSegment = ({
  paths,
}: {
  paths: readonly (typeof SIGNATURE_PATH_DATA)[number][];
}) => (
  <>
    {paths.map(({ className, d, strokeWidth }) => (
      <path
        key={className}
        className={className}
        d={d}
        {...pathProps}
        strokeWidth={strokeWidth}
      />
    ))}
  </>
);

/** Path elements for the animated signature SVG */
export const SignaturePaths = () => (
  <g className="dark:fill-white">
    <SignaturePathSegment paths={SIGNATURE_PATH_DATA.slice(0, 14)} />
    <SignaturePathSegment paths={SIGNATURE_PATH_DATA.slice(14, 28)} />
    <SignaturePathSegment paths={SIGNATURE_PATH_DATA.slice(28, 42)} />
    <SignaturePathSegment paths={SIGNATURE_PATH_DATA.slice(42, 56)} />
  </g>
);
