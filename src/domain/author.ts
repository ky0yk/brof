import { Result } from "neverthrow";

export type Author = {
  id: string;
  name: string;
  email: string;
};

export interface IAuthorRepository {
  findById(id: string): Result<Author, Error>;
}
