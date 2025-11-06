import type { FC } from "react";

type AfterQuoteProps = {
  text: string;
  subtext?: string;
  link?: string;
};

const AfterQuote: FC<AfterQuoteProps> = ({ text, subtext, link }) => (
  <div className="-mt-10 w-full text-right text-sm">
    <div className="flex items-center justify-end gap-2">
      <hr className="my-auto w-16 border-muted-foreground border-dotted" />
      <div>
        {link ? (
          <a className="hover:underline" href={link} target="_blank">
            {text}
          </a>
        ) : (
          text
        )}
        {subtext && ","}
      </div>
      {subtext && <div className="text-muted-foreground">{subtext}</div>}
    </div>
  </div>
);

export default AfterQuote;
