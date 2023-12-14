"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import {
  DotsHorizontalIcon,
  ExternalLinkIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

export default function ManageArticle({
  id,
  title,
  slug,
}: {
  id: string;
  title: string;
  slug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  async function deleteDocument(id: string) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!res?.ok) {
      toast({
        title: "Something went wrong.",
        description: "Your document was not deleted. Please try again.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            onSelect={() => router.push(`/article/${slug}`)}
            className="flex cursor-pointer items-center"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`/dashboard/edit/${id}`)}
            className="flex cursor-pointer items-center"
          >
            <Pencil2Icon className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this article?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await deleteDocument(id);

                if (deleted) {
                  startTransition(() => {
                    if (pathname.includes(id)) {
                      router.push(`/`);
                    }
                    // Force a cache invalidation.
                    router.refresh();
                  });
                  toast({
                    title: "Article deleted.",
                    description: `${title} was successfully deleted.`,
                    variant: "default",
                  });
                }
                setIsLoading(false);
                setShowDeleteAlert(false);
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isMutating ? (
                <TrashIcon className="mr-2 h-4 w-4" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
