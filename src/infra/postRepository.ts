import { Result, ok, err } from "neverthrow";
import { IPostRepository, Post } from "../domain/post";

export class InMemoryPostRepository implements IPostRepository {
  private posts: Post[] = [];

  save(post: Post): Result<Post, Error> {
    try {
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        this.posts[index] = post;
      } else {
        this.posts.push(post);
      }
      return ok(post);
    } catch (error) {
      return err(new Error("Failed to save the post."));
    }
  }
}
