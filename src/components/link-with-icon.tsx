const LinkWithIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      className="group inline-flex w-fit underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
      href={href}
      target="_blank"
    >
      {children}
      {/* <ArrowTopRightIcon className="w-3 h-3 text-muted-foreground mt-1 group-hover:translate-x-[0.125rem] group-hover:-translate-y-[0.125rem] ease-in-out transition-all " /> */}
    </a>
  );
};

export default LinkWithIcon;
