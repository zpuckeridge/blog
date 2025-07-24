import Link from "next/link";
import LinkWithIcon from "@/src/components/link-with-icon";
import {
	type EducationItem,
	type EmploymentItem,
	educationHistory,
	employmentHistory,
} from "@/src/lib/cvItems";

export default function CV() {
	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="text-sm flex flex-col gap-2">
					<p className="text-2xl font-semibold font-serif italic">Curriculum Vitae</p>

					<p>An overview of my work experience and education.</p>
				</div>

				<div className="space-y-10">
					<p className="font-serif text-lg font-semibold">Employment</p>

					{employmentHistory.map((item: EmploymentItem) => (
						<div key={item.title + item.startYear} className="flex flex-row gap-4">
							<div className="w-20">
								<p className="text-muted-foreground text-xs">
									{item.startYear} – {item.endYear === "Present" ? "Now" : item.endYear}
								</p>
							</div>

							<div className="w-full space-y-2">
								<div>
									<p>
										{item.position} at <LinkWithIcon href={item.url}>{item.title}</LinkWithIcon>
									</p>
									<p className="text-muted-foreground text-xs">
										{item.location.includes("Australia") && (
											<span role="img" aria-label="Australia Flag">
												🇦🇺{" "}
											</span>
										)}
										{item.location.includes("United States") && (
											<span role="img" aria-label="United States Flag">
												🇺🇸{" "}
											</span>
										)}
										{item.location}
									</p>
								</div>

								<div>
									<p className="text-sm mt-1">{item.description}</p>
								</div>
							</div>
						</div>
					))}

					<hr className="border-dotted border-muted-foreground" />

					<div className="space-y-10">
						<p className="font-serif text-lg font-semibold">Education</p>
						{educationHistory.map((item: EducationItem) => (
							<div key={item.title + item.startDate} className="flex flex-row gap-4">
								<div className="w-20">
									<p className="text-muted-foreground text-xs">
										{item.startDate.slice(0, 4)} – {item.endDate.slice(0, 4)}
									</p>
								</div>

								<div className="w-full space-y-2">
									<div>
										<p>
											{item.url ? (
												<LinkWithIcon href={item.url}>{item.title}</LinkWithIcon>
											) : (
												item.title
											)}
										</p>
										<p className="text-muted-foreground text-xs">
											{item.field}
											{item.credential ? ` (${item.credential})` : ""}
											{item.location && ` • ${item.location}`}
										</p>
									</div>

									{item.description && (
										<div>
											<p className="text-sm mt-1">{item.description}</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<Link
					href="/"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground"
				>
					../
				</Link>
			</div>
		</div>
	);
}
