import { FC } from "react";

interface SideNoteProps {
  children: React.ReactNode;
  note: React.ReactNode;
}

const SideNote: FC<SideNoteProps> = ({ children, note }) => {
  return (
    <div className="relative w-full ">
      <div className="flex-1">{children}</div>
      <div className="h-3 border-b border-r border-l -mt-2 2xl:hidden" />
      <div className="2xl:absolute 2xl:w-[175px] 2xl:top-0 2xl:border-l 2xl:pl-4 2xl:-right-48 2xl:inline-flex pt-2 pb-4 2xl:pt-0 2xl:pb-0 px-4 2xl:px-0 text-xs text-muted-foreground font-normal">
        {note}
      </div>
    </div>
  );
};

export default SideNote;
