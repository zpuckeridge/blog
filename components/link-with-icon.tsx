import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const LinkWithIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 transition inline-flex group ease-in-out"
    >
      {children}
      <ArrowTopRightIcon className="w-3 h-3 text-muted-foreground mt-1 group-hover:translate-x-[0.125rem] group-hover:-translate-y-[0.125rem] ease-in-out transition-all " />
    </a>
  );
};

export default LinkWithIcon;
