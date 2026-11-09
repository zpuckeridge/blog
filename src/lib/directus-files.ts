import { readFiles } from "@directus/sdk";

import { isDirectusAssetId } from "@/lib/directus-asset";
import { withContentCache } from "@/lib/directus-content-cache";

import directus from "./directus";

export interface DirectusFileMeta {
  description: string | null;
  filesize: number | null;
  id: string;
  title: string | null;
  type: string | null;
}

const normaliseDirectusFile = (file: {
  description?: string | null;
  filesize?: number | string | null;
  id?: string;
  title?: string | null;
  type?: string | null;
}): DirectusFileMeta | null => {
  if (!file.id || !isDirectusAssetId(file.id)) {
    return null;
  }

  const filesize = Number(file.filesize);
  return {
    description: file.description?.trim() ? file.description.trim() : null,
    filesize:
      Number.isFinite(filesize) && filesize >= 0 ? Math.round(filesize) : null,
    id: file.id.toLowerCase(),
    title: file.title?.trim() ? file.title.trim() : null,
    type: file.type ?? null,
  };
};

export const getDirectusFileMeta = (
  ids: readonly string[]
): Promise<DirectusFileMeta[]> => {
  const unique = [
    ...new Set(
      ids.map((id) => id.toLowerCase()).filter((id) => isDirectusAssetId(id))
    ),
  ].toSorted();

  if (unique.length === 0) {
    return Promise.resolve([]);
  }

  return withContentCache(
    `files:${unique.join(",")}`,
    async () => {
      try {
        const files = (await directus.request(
          readFiles({
            fields: ["id", "title", "description", "filesize", "type"],
            filter: { id: { _in: unique } },
            limit: unique.length,
          })
        )) as {
          description?: string | null;
          filesize?: number | string | null;
          id?: string;
          title?: string | null;
          type?: string | null;
        }[];

        return files.flatMap((file) => {
          const normalised = normaliseDirectusFile(file);
          return normalised ? [normalised] : [];
        });
      } catch (error) {
        console.error("Directus file metadata request failed", error);
        return [];
      }
    },
    { shouldCache: (items) => items.length > 0 }
  );
};
