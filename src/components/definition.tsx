import type { FC } from "react";

interface DefinitionProps {
  meaning: string;
  type?: string;
  word: string;
}

const Definition: FC<DefinitionProps> = ({ word, meaning, type }) => (
  <dl className="not-prose border bg-neutral-50 p-3 text-black text-sm dark:bg-neutral-900 dark:text-neutral-300">
    <dt className="font-medium">
      {word}
      {type ? (
        <span className="font-normal text-muted-foreground italic">
          <span aria-hidden="true"> · </span>
          {type}
        </span>
      ) : null}
    </dt>
    <dd className="mt-3">{meaning}</dd>
  </dl>
);

export default Definition;
