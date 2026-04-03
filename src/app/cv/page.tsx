import Link from "next/link";

import LinkWithIcon from "@/components/link-with-icon";
import { educationHistory, employmentHistory } from "@/lib/cv-items";
import type { EducationItem, EmploymentItem } from "@/lib/cv-items";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  description:
    "An overview of my work experience and education as a Web Developer and IT Administrator.",
  path: "/cv",
  title: "CV",
});

const CV = () => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
    <div className="flex flex-col space-y-20 text-sm">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-redaction text-white text-xl">Curriculum Vitae</p>

        <p>An overview of my work experience and education.</p>
      </div>

      <div className="space-y-10">
        <p className="font-redaction text-lg text-white">Employment</p>

        {employmentHistory.map((item: EmploymentItem) => (
          <div
            className="flex flex-row gap-4"
            key={item.title + item.startYear}
          >
            <div className="w-20">
              <p className="text-muted-foreground text-xs">
                {item.startYear} –{" "}
                {item.endYear === "Present" ? "Now" : item.endYear}
              </p>
            </div>

            <div className="w-full space-y-2">
              <div>
                <p>
                  {item.position} at{" "}
                  <LinkWithIcon href={item.url}>{item.title}</LinkWithIcon>
                </p>
                <p className="text-muted-foreground text-xs">
                  {item.location.includes("Australia") && (
                    <span aria-label="Australia Flag" role="img">
                      🇦🇺{" "}
                    </span>
                  )}
                  {item.location.includes("United States") && (
                    <span aria-label="United States Flag" role="img">
                      🇺🇸{" "}
                    </span>
                  )}
                  {item.location}
                </p>
              </div>

              <div>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        <hr className="border-muted-foreground border-dotted" />

        <div className="space-y-10">
          <p className="font-redaction text-lg text-white">Education</p>
          {educationHistory.map((item: EducationItem) => (
            <div
              className="flex flex-row gap-4"
              key={item.title + item.startDate}
            >
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
                    <p className="mt-1 text-sm">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
        href="/"
      >
        ../
      </Link>
    </div>
  </div>
);

export default CV;
