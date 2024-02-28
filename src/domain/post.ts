import { Result, err, ok } from "neverthrow";

export type Post = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
};

export const toPost = (
  authorId: string,
  title: string,
  content: string,
  published: boolean = false
): Result<Post, Error> => {
  if (!authorId || !title || !content) {
    return err(new Error("Missing required fields for creating a post."));
  }

  const post: Post = {
    id: generateId(),
    authorId,
    title,
    content,
    published,
  };

  return ok(post);
};

// サンプルとしてのID生成関数
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// ブログ内容のバリデーション
export const validatePostContent = (post: Post): Result<Post, Error> => {
  if (post.content.includes("invalid content")) {
    return err(new Error("Post validation failed: Invalid content found"));
  }
  return ok(post);
};

export interface IPostRepository {
  save(post: Post): Result<Post, Error>;
}
