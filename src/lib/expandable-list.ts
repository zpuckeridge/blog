const expandableListGridBaseClassName =
  "grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(5ch,max-content)] gap-x-4 overflow-hidden px-1";

export const expandableListSectionGridClassName = `${expandableListGridBaseClassName} gap-y-4`;

export const expandableListGridClassName = expandableListSectionGridClassName;

export const expandableListPreviewGridClassName = expandableListSectionGridClassName;

export const expandableListYearHeaderClassName =
  "col-span-full -mx-1 grid grid-cols-subgrid items-center px-1";

export const expandableListYearGroupsClassName = "flex w-full flex-col gap-2";

export const expandableListYearPageClassName = "space-y-4";

export const expandableListSectionHeaderClassName =
  "col-span-full -mx-1 grid grid-cols-subgrid items-center px-1";

export const expandableListSectionHeaderMainClassName =
  "flex min-w-0 items-center gap-2";

export const expandableListItemsClassName =
  "col-span-full grid min-w-0 grid-cols-subgrid gap-y-1 overflow-hidden text-sm";

export const expandableListMetaClassName = "text-right tabular-nums";

export const expandableListSectionLinkClassName =
  "justify-self-end px-1 text-right tabular-nums whitespace-nowrap text-muted-foreground text-sm hover:bg-muted";

export const expandableListItemClassName =
  "col-span-full grid min-w-0 grid-cols-subgrid";

export const expandableListItemExpandedClassName = "gap-y-1";

export const expandableListTriggerClassName =
  "col-span-full grid grid-cols-subgrid -mx-1 w-full items-center px-1 text-left hover:bg-muted";

export const expandableListTitleClassName = "min-w-0 truncate";

export const expandableListDetailsClassName = "col-span-full -mx-1 px-1";
