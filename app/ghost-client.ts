import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: "https://ghost.zacchary.me",
  key: "5fddf64a7f51c3c4f9727a51b1",
  version: "v5.0",
});

export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPostsNew() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      order: "published_at DESC",
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPostsOld() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      order: "published_at ASC",
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getLatestPost() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 1,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ["tags", "authors"] }
    )
    .catch((err) => {
      console.error(err);
    });
}

export async function getTagPosts(tagSlug: string) {
  return await api.posts
    .browse({ filter: `tag:${tagSlug}`, include: "count.posts" })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getAllTags() {
  return await api.tags
    .browse({
      limit: "all",
    })
    .catch((err) => {
      console.log(err);
    });
}
