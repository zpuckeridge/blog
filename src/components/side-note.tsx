import type { FC } from "react";

type SideNoteProps = {
	children: React.ReactNode;
	note: React.ReactNode;
	position?: "left" | "right";
};

const SideNote: FC<SideNoteProps> = ({ children, note, position }) => {
	return (
		<div className="relative w-full">
			<div className="flex-1">{children}</div>
			<div className="-mt-2 h-3 border-muted-foreground border-r border-l border-dotted lg:hidden" />
			<div className="border-muted-foreground border-b border-dotted lg:hidden" />
			<div
				className={`border-muted-foreground border-dotted px-4 pt-2 pb-4 font-normal text-muted-foreground text-xs lg:absolute lg:top-0 lg:inline-flex lg:w-[175px] lg:border-l lg:px-0 lg:pt-0 lg:pb-0 lg:pl-4 ${
					position === "left"
						? "lg:-left-48 border-muted-foreground border-dotted lg:border-r lg:border-l-0 lg:pr-4 lg:pl-0"
						: "lg:-right-48"
				}`}
			>
				{note}
			</div>
		</div>
	);
};

export default SideNote;
