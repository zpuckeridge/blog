import { createContext } from "react";

import type { ContentImageMeta } from "@/lib/content-image";

export const ImageMetaContext = createContext<
  Readonly<Record<string, ContentImageMeta>>
>({});

export const HeadingShiftContext = createContext(0);
