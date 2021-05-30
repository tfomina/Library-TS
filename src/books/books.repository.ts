import { injectable } from "inversify";
import "reflect-metadata";
import { IBook, IBooksRepository } from "./books.types";
import { Book } from "./books.model";

@injectable()
export class BooksRepository implements IBooksRepository {
  createBook(data: Omit<IBook, "id">): Promise<IBook> {
    return Book.create(data);
  }

  getBook(id: string): Promise<IBook> {
    return Book.findById(id);
  }

  getBooks(): Promise<IBook[]> {
    return Book.find();
  }

  updateBook(book: IBook): Promise<IBook> {
    const { id, ...otherProps } = book;
    return Book.findByIdAndUpdate(id, otherProps);
  }

  deleteBook(id: string): Promise<void> {
    return Book.findByIdAndDelete(id);
  }
}
