"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TipTapEditorExtensions } from "./extensions";
import { TipTapEditorProps } from "./props";
import { PatchDocType } from "@/app/api/posts/[id]/route";
import { useDebouncedCallback } from "use-debounce";
import { Button, buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, ExternalLink, Loader2, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import Back from "../back";

export default function Editor({
  document,
  id,
}: {
  document: PatchDocType;
  id: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSaving, setSaving] = useState(false); // Changed state variable
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [content, setContent] = useState<PatchDocType["content"]>();
  const [title, setTitle] = useState<string>(document.title);
  const [description, setDescription] = useState<string>(document.description);
  const [tag, setTag] = useState<string>(document.tag);
  const [slug, setSlug] = useState<string>(document.slug);
  const [published, setPublished] = useState<boolean>(document.published);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  async function patchRequest(
    id: string,
    title: string,
    description: string,
    slug: string,
    tag: string,
    published: boolean,
    document: any,
  ) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        slug: slug,
        tag: tag,
        published: published,
        content: document,
      }),
    });

    if (!response.ok) {
      setSaving(false);
      throw new Error("Failed to update document");
    }

    setSaving(false);

    startTransition(() => {
      router.refresh();
    });
  }

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    await patchRequest(id, title, description, slug, tag, published, json);
    setTimeout(() => {
      setSaving(false);
    }, 500);
  }, 1000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => {
      setSaving(true);
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
    setSaving(true);
    debouncedUpdates.flush(); // Trigger immediate save without debounce

    try {
      await patchRequest(id, title, description, slug, tag, published, content);
      setShowEditDialog(false);
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="sticky py-4 top-0 z-50 flex justify-between w-full bg-opacity-75 backdrop-blur-lg">
        <Back />

        <p className="text-sm my-auto">{title}</p>

        <div className="flex gap-2 my-auto">
          <Link
            href={`/article/${slug}`}
            className={buttonVariants({ variant: "ghost" })}
            aria-label="View Post"
          >
            <ExternalLink className="w-4 h-4" />
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
                  Update your article title, slug, tag and visibility status.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title" className="my-1">
                    Title
                  </Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="my-1">
                    Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className="my-1">
                    Slug
                  </Label>
                  <Input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="tag" className="my-1">
                    Tag
                  </Label>
                  <Input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="published" className="my-1">
                    Published
                  </Label>
                  <div>
                    <Switch
                      checked={published}
                      onCheckedChange={(isChecked) => setPublished(isChecked)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSave}>
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" /> // Render the loader when saving
                  ) : (
                    <p>Save</p>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Badge variant="secondary">
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" /> // Render the loader when saving
            ) : (
              <Check className="w-4 h-4" />
            )}
          </Badge>
          <ModeToggle />
        </div>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold">{title}</h1>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
