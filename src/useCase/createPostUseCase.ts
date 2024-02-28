import { Result } from "neverthrow";
import {
  IPostRepository,
  Post,
  toPost,
  validatePostContent,
} from "../domain/post";
import { IAuthorRepository } from "../domain/author";

export const createPostUseCase =
  (authorRepository: IAuthorRepository, postRepository: IPostRepository) =>
  (authorId: string, title: string, content: string): Result<Post, Error> => {
    return authorRepository
      .findById(authorId)
      .andThen(() => toPost(authorId, title, content))
      .andThen(validatePostContent)
      .andThen(postRepository.save)
      .mapErr(handleError);
  };

const handleError = (error: Error): Error => {
  if (error.message.includes("Author not found")) {
    return new Error("Failed to create post: Author does not exist.");
  } else if (error.message.includes("validation failed")) {
    return new Error("Failed to create post: Content validation failed.");
  } else {
    return new Error(`Failed to create post: ${error.message}`);
  }
};
