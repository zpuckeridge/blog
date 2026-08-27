/**
 * Horizontal media row: each child stays article-column width at 16/9,
 * while the scroll track extends to the viewport’s right edge so the next
 * item peeks past the column (max-w-lg + px-6 layout).
 */
const MdxOverflow = ({ children }: { children: React.ReactNode }) => (
  <div className="@container not-prose relative z-10 w-full">
    <div className="flex w-[calc(100vw-max(1.5rem,(100vw-32rem)/2+1.5rem))] max-w-[100vw] snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pr-6 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&>*]:!my-0 [&>*]:w-[100cqw] [&>*]:max-w-[100cqw] [&>*]:shrink-0 [&>*]:snap-start">
      {children}
    </div>
  </div>
);

export default MdxOverflow;
