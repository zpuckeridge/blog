import type { FC } from "react";

interface DefinitionProps {
	meaning: string;
	type?: string;
	word: string;
}

const Definition: FC<DefinitionProps> = ({ word, meaning, type }) => {
	return (
		<div className="bg-neutral-50 dark:bg-neutral-900 text-black dark:text-neutral-300 text-sm border rounded-lg py-4 px-6 space-y-4">
			<div className="flex gap-1 items-center">
				<div className="text-sm">{word}</div> ·
				{type && <div className="text-xs text-muted-foreground italic">{type}</div>}
			</div>
			<div className="text-sm ">{meaning}</div>
		</div>
	);
};

export default Definition;
