import BackLink from "@/components/back-link";
import LinkWithIcon from "@/components/link-with-icon";
import { educationHistory, employmentHistory } from "@/lib/cv-items";
import type { EducationItem, EmploymentItem } from "@/lib/cv-items";

const CvPage = () => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
    <div className="flex flex-col gap-y-20 text-sm">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="font-redaction text-black text-xl dark:text-white">
            Curriculum Vitae
          </h1>

          <p>An overview of my work experience and education.</p>
        </div>

        <div className="space-y-10">
          <hr className="border-dotted border-border" />

          <div className="space-y-10">
            <h2 className="font-redaction text-lg text-black dark:text-white">
              Employment
            </h2>

            {employmentHistory.map((item: EmploymentItem) => (
              <div
                className="flex flex-row items-baseline gap-4 text-sm leading-normal"
                key={item.title + item.startYear}
              >
                <div className="w-20 shrink-0">
                  <p className="text-muted-foreground text-sm">
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
                    <p className="text-muted-foreground text-sm">
                      {item.location.includes("Australia") && (
                        <span aria-hidden="true">🇦🇺 </span>
                      )}
                      {item.location.includes("United States") && (
                        <span aria-hidden="true">🇺🇸 </span>
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

            <hr />

            <div className="space-y-10">
              <h2 className="font-redaction text-lg text-black dark:text-white">
                Education
              </h2>
              {educationHistory.map((item: EducationItem) => (
                <div
                  className="flex flex-row items-baseline gap-4 text-sm leading-normal"
                  key={item.title + item.startDate}
                >
                  <div className="w-20 shrink-0">
                    <p className="text-muted-foreground text-sm">
                      {item.startDate.slice(0, 4)} – {item.endDate.slice(0, 4)}
                    </p>
                  </div>

                  <div className="w-full space-y-2">
                    <div>
                      <p>
                        {item.url ? (
                          <LinkWithIcon href={item.url}>
                            {item.title}
                          </LinkWithIcon>
                        ) : (
                          item.title
                        )}
                      </p>
                      <p className="text-muted-foreground text-sm">
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
        </div>
      </div>

      <BackLink href="/">../</BackLink>
    </div>
  </div>
);

export default CvPage;
