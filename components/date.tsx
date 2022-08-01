import fs from "fs";
import matter from "gray-matter";

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function ReadableDate({ frontmatter }) {
  const dateString = frontmatter.date;
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
//   return new Date(dateString).toLocaleDateString(undefined, options);
return {frontmatter.date}
}
