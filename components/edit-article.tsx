"use client";

import { useState } from "react";
import Link from "next/link";
import { Editor as NovelEditor } from "novel";
import Back from "@/components/back";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Check, ExternalLink, Eye, Loader2, Settings } from "lucide-react";

export default function Editor({
  document,
  id,
}: {
  document: any;
  id: string;
}) {
  const [isSaving, setSaving] = useState(false); // Changed state variable
  const [content, setContent] = useState(document.content);
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
    content: any,
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
        content: content,
      }),
    });

    if (!response.ok) {
      setSaving(false);
      throw new Error("Failed to update document");
    }

    setSaving(false);
  }

  const handleSave = async () => {
    setSaving(true);

    localStorage.removeItem("novel__content");

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
                  Update the article title, slug, tag and visibility status.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Update the article title.
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Update the article description.
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Update the article slug.
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tag" className="my-1">
                    Tag
                  </Label>
                  <Input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Update the article tag.
                  </p>
                </div>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <Eye />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="published" className="my-1">
                      Published
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {published
                        ? "This article is currently published."
                        : "This article is currently not published."}
                    </p>
                  </div>
                  <Switch
                    checked={published}
                    onCheckedChange={(isChecked) => setPublished(isChecked)}
                  />
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
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">{title}</h1>

        <NovelEditor
          defaultValue={content}
          onUpdate={(editor) => {
            setContent(editor?.storage.markdown.getMarkdown());
          }}
          onDebouncedUpdate={handleSave}
          className="dark"
        />
      </div>
    </div>
  );
}
