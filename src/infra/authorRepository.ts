import { Result, ok, err } from "neverthrow";
import { Author, IAuthorRepository } from "../domain/author";

export class InMemoryAuthorRepository implements IAuthorRepository {
  private authors: Author[] = [];

  findById(id: string): Result<Author, Error> {
    try {
      const author = this.authors.find((a) => a.id === id);
      if (author) {
        return ok(author);
      } else {
        return err(new Error("Author not found."));
      }
    } catch (error) {
      return err(new Error("Failed to find the author."));
    }
  }
}
