import type { FC } from "react";

interface AfterQuoteProps {
	text: string;
	subtext?: string;
	link?: string;
}

const AfterQuote: FC<AfterQuoteProps> = ({ text, subtext, link }) => {
	return (
		<div className="text-sm text-right w-full -mt-14">
			<div className="inline-flex items-center gap-2 flex justify-end">
				<hr className="w-16 border-muted-foreground border-dotted my-auto" />
				<div>
					{link ? (
						<a href={link} className="hover:underline">
							{text}
						</a>
					) : (
						text
					)}
					,
				</div>
				{subtext && <div className="text-muted-foreground">{subtext}</div>}
			</div>
		</div>
	);
};

export default AfterQuote;
