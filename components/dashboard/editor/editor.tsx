"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeftIcon,
  PaperPlaneIcon,
  SlashIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditorProps {
  defaultBlocks: any;
  defaultContent: any;
  id: string;
}

export default function Editor({
  defaultBlocks,
  defaultContent,
  id,
}: EditorProps) {
  const router = useRouter();

  const [blocks, setBlocks] = useState(defaultBlocks);
  const [content, setContent] = useState(defaultContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const response = await fetch(`/api/article/content`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          blocks,
          content,
        }),
      });

      if (response.ok) {
        toast({
          title: "Post Updated",
          description: "Post was successfully updated.",
        });

        router.refresh();
      }
    } catch (e) {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const editor: BlockNoteEditor | null = useBlockNote({
    editable: true,
    initialContent: blocks,
    onEditorContentChange: (editor) => {
      const saveBlocksAsJSON = async () => {
        setBlocks(editor.topLevelBlocks);
      };

      const saveBlocksAsMarkdown = async () => {
        const markdown: string = await editor.blocksToMarkdownLossy(
          editor.topLevelBlocks,
        );
        setContent(markdown);
      };

      saveBlocksAsJSON();
      saveBlocksAsMarkdown();
    },
  });

  return (
    <div className="max-w-3xl w-full mx-auto space-y-4">
      <div className="flex justify-between">
        <Link
          href={`/dashboard`}
          className={`flex gap-2 ${buttonVariants({
            variant: "outline",
            size: "sm",
          })}`}
        >
          <ArrowLeftIcon />
          Dashboard
        </Link>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="sm"
          variant="outline"
        >
          {isSaving ? (
            <p className="flex gap-2">
              <SlashIcon className="animate-spin w-4 h-4" /> Save Changes
            </p>
          ) : (
            <p className="flex gap-2">
              <PaperPlaneIcon className="w-4 h-4" /> Save Changes
            </p>
          )}
        </Button>
      </div>

      <BlockNoteView editor={editor} theme="dark" />
    </div>
  );
}
