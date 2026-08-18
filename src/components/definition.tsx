import type { FC } from "react";

interface DefinitionProps {
  meaning: string;
  type?: string;
  word: string;
}

const Definition: FC<DefinitionProps> = ({ word, meaning, type }) => (
  <dl className="space-y-4 border bg-neutral-50 p-3 text-black text-sm dark:bg-neutral-900 dark:text-neutral-300">
    <div className="flex items-center gap-1">
      <dt className="text-sm">{word}</dt>
      {type ? (
        <dd className="m-0 text-muted-foreground text-sm italic">
          <span aria-hidden="true"> · </span>
          {type}
        </dd>
      ) : null}
    </div>
    <dd className="m-0 text-sm">{meaning}</dd>
  </dl>
);

export default Definition;
