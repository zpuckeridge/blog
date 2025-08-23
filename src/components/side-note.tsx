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
			<div className="h-3 border-muted-foreground border-dotted border-r border-l -mt-2 lg:hidden" />
			<div className="border-b border-muted-foreground border-dotted lg:hidden" />
			<div
				className={`lg:absolute lg:w-[175px] lg:top-0 lg:border-l lg:pl-4 lg:inline-flex pt-2 pb-4 lg:pt-0 lg:pb-0 px-4 lg:px-0 text-xs text-muted-foreground font-normal border-muted-foreground border-dotted ${
					position === "left"
						? "lg:-left-48 lg:border-r lg:border-l-0 lg:pl-0 lg:pr-4 border-muted-foreground border-dotted"
						: "lg:-right-48"
				}`}
			>
				{note}
			</div>
		</div>
	);
};

export default SideNote;
