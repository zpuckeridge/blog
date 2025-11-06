"use client";

export default function FootnotesNavigation({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...props}
      className="text-muted-foreground"
      onClick={(e) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    >
      {children}
    </a>
  );
}
