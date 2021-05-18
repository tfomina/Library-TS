import { IBook, IBookRepository } from "../types/book";
const { Book } = require("../models/book");

export class BookRepository implements IBookRepository {
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
