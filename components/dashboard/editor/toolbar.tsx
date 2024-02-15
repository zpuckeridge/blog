"use client";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ExternalLinkIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  MixerHorizontalIcon,
  PaperPlaneIcon,
  SlashIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ArticleToolbar({
  article,
  id,
}: {
  article: any;
  id: string;
}) {
  const router = useRouter();

  const [isSaving, setSaving] = useState(false);
  const [title, setTitle] = useState<string>(article.title);
  const [description, setDescription] = useState<string>(article.description);
  const [tag, setTag] = useState<string>(article.tag);
  const [slug, setSlug] = useState<string>(article.slug);
  const [published, setPublished] = useState<boolean>(article.published);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch(`/api/article/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
          slug: slug,
          tag: tag,
          published: published,
        }),
      });

      if (response.ok) {
        toast({
          title: "Post Updated",
          description: "Post was successfully updated.",
        });

        router.refresh();
      }

      setShowEditDialog(false);
    } catch (e) {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border rounded-md px-6 py-2">
      <div className="flex justify-between gap-2 my-auto">
        <h1 className="text-xl my-auto font-semibold text-center">
          {article.title}
        </h1>

        <div className="flex gap-2 my-auto">
          <Link
            href={`/article/${slug}`}
            className={`flex gap-2 ${buttonVariants({
              variant: "outline",
              size: "sm",
            })}`}
          >
            <ExternalLinkIcon className="w-4 h-4" /> View
          </Link>
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2" size="sm">
                <MixerHorizontalIcon className="w-4 h-4" /> Edit
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
                  <Input value={tag} onChange={(e) => setTag(e.target.value)} />
                  <p className="text-sm text-muted-foreground">
                    Update the article tag.
                  </p>
                </div>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  {published ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  <div className="flex-1">
                    <Label htmlFor="published" className="my-1">
                      {published ? "Published" : "Not Published"}
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
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                  variant="outline"
                >
                  {isSaving ? (
                    <p className="flex gap-2">
                      <SlashIcon className="w-4 h-4 animate-spin" /> Save
                      Changes
                    </p>
                  ) : (
                    <p className="flex gap-2">
                      <PaperPlaneIcon className="w-4 h-4" /> Save Changes
                    </p>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
