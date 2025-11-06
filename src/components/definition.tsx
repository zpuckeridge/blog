import type { FC } from "react";

type DefinitionProps = {
  meaning: string;
  type?: string;
  word: string;
};

const Definition: FC<DefinitionProps> = ({ word, meaning, type }) => (
  <div className="space-y-4 rounded-lg border bg-neutral-50 px-6 py-4 text-black text-sm dark:bg-neutral-900 dark:text-neutral-300">
    <div className="flex items-center gap-1">
      <div className="text-sm">{word}</div> ·
      {type && (
        <div className="text-muted-foreground text-xs italic">{type}</div>
      )}
    </div>
    <div className="text-sm">{meaning}</div>
  </div>
);

export default Definition;
