import type { MouseEventHandler, ReactNode } from "react";

import {
  expandableListDetailsClassName,
  expandableListItemClassName,
  expandableListItemExpandedClassName,
  expandableListMetaClassName,
  expandableListTitleClassName,
  expandableListTriggerClassName,
} from "@/lib/expandable-list";

interface ExpandableListItemProps {
  children: ReactNode;
  contentClassName: string;
  date: string;
  expandedDetailsClassName: string;
  id: string;
  isExpanded: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
  title: string;
}

const ExpandableListItem = ({
  children,
  contentClassName,
  date,
  expandedDetailsClassName,
  id,
  isExpanded,
  onToggle,
  title,
}: ExpandableListItemProps) => (
  <div
    className={`${expandableListItemClassName} ${isExpanded ? expandableListItemExpandedClassName : ""}`}
  >
    <button
      aria-expanded={isExpanded}
      aria-label={`${title} - Click to ${isExpanded ? "hide" : "show"} details`}
      className={expandableListTriggerClassName}
      data-id={id}
      onClick={onToggle}
      type="button"
    >
      <p className={expandableListTitleClassName}>{title}</p>
      <p className={`${expandableListMetaClassName} text-muted-foreground`}>
        {date}
      </p>
    </button>
    <div
      className={`${expandableListDetailsClassName} overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? expandedDetailsClassName : "max-h-0 opacity-0"
      }`}
    >
      <div className={contentClassName}>{children}</div>
    </div>
  </div>
);

export default ExpandableListItem;
