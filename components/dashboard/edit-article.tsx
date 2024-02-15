import dynamic from "next/dynamic";
import ArticleToolbar from "./editor/toolbar";

const Editor = dynamic(() => import("./editor/editor"), { ssr: false });

export default function EditArticleForm({
  article,
  id,
}: {
  article: any;
  id: string;
}) {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 space-y-8">
      <ArticleToolbar article={article} id={id} />

      <Editor
        defaultBlocks={article.blocks}
        defaultContent={article.content}
        id={id}
      />
    </div>
  );
}
