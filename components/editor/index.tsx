"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TipTapEditorExtensions } from "./extensions";
import { TipTapEditorProps } from "./props";
import { PatchDocType } from "@/app/api/posts/[id]/route";
import { useDebouncedCallback } from "use-debounce";
import Back from "../back";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Input } from "../ui/input";

export default function Editor({
  document,
  id,
}: {
  document: PatchDocType;
  id: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [content, setContent] = useState<PatchDocType["content"]>();
  const [title, setTitle] = useState<string>(document.title);
  const [tag, setTag] = useState<string>(document.tag);
  const [slug, setSlug] = useState<string>(document.slug);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  async function patchRequest(
    id: string,
    title: string,
    slug: string,
    tag: string,
    document: any,
  ) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        slug: slug,
        tag: tag,
        content: document,
      }),
    });

    if (!response.ok) {
      setSaveStatus("Waiting to Save.");
      throw new Error("Failed to update document");
    }

    setSaveStatus("Saved");

    startTransition(() => {
      router.refresh();
    });
  }

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    await patchRequest(id, title, slug, tag, content);
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 1000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Saving...");
      debouncedUpdates(e);
    },
    content: content,
  });

  // Hydrate the editor with the content from the database.
  useEffect(() => {
    if (editor && document && !hydrated) {
      editor.commands.setContent(document.content);
      setHydrated(true);
    }
  }, [editor, document, hydrated]);

  const handleSave = async () => {
    debouncedUpdates.flush(); // Trigger immediate save without debounce

    try {
      await patchRequest(id, title, slug, tag, content);
      setShowEditDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl my-20 space-y-8">
      <div className="flex justify-between">
        <Back />
        <div className="flex gap-2">
          <Link href={`/article/${slug}`}>
            <Button variant="ghost">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogTrigger>
              <Button variant="ghost">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Article</DialogTitle>
                <DialogDescription>
                  Update the article name, slug, and tag.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="secondary">Unpublish</Button>
          <Badge variant="secondary">{saveStatus}</Badge>
        </div>
      </div>
      <h1 className="text-6xl font-bold">{title}</h1>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
