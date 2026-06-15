const MdxOverflow = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">
    <div style={{ width: "800px" }}>
      <div className="flex w-full gap-2 pb-4">{children}</div>
    </div>
  </div>
);

export default MdxOverflow;
