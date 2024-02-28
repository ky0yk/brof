import { InMemoryAuthorRepository } from "../infra/authorRepository";
import { InMemoryPostRepository } from "../infra/postRepository";
import { createPostUseCase } from "../useCase/createPostUseCase";

const authorRepository = new InMemoryAuthorRepository();
const postRepository = new InMemoryPostRepository();

const createPost = createPostUseCase(authorRepository, postRepository);

// 任意のパラメータ
const authorId = "1";
const title = "New Post Title";
const content = "This is the content of the new post.";

createPost(authorId, title, content).match(
  (post) => console.log("Post created successfully:", post),
  (err) => `Error: ${err}`
);
