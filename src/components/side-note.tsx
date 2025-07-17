import type { FC } from "react";

interface SideNoteProps {
	children: React.ReactNode;
	note: React.ReactNode;
	position?: "left" | "right";
}

const SideNote: FC<SideNoteProps> = ({ children, note, position }) => {
	return (
		<div className="relative w-full">
			<div className="flex-1">{children}</div>
			<div className="h-3 border-muted-foreground border-dotted border-b border-r border-l -mt-2 2xl:hidden" />
			<div
				className={`2xl:absolute 2xl:w-[175px] 2xl:top-0 2xl:border-l 2xl:pl-4 2xl:inline-flex pt-2 pb-4 2xl:pt-0 2xl:pb-0 px-4 2xl:px-0 text-xs text-muted-foreground font-normal border-muted-foreground border-dotted ${
					position === "left"
						? "2xl:-left-48 2xl:border-r 2xl:border-l-0 2xl:pl-0 2xl:pr-4 border-muted-foreground border-dotted"
						: "2xl:-right-48"
				}`}
			>
				{note}
			</div>
		</div>
	);
};

export default SideNote;
