export type IBook = {
  id: String;
  title: String;
  description: String;
  authors: String;
  favorite?: String;
  fileCover?: String;
  fileName?: String;
  fileBook?: String;
};

export interface IBookRepository {
  createBook(data: Omit<IBook, "id">): Promise<IBook>;
  getBook(id: string): Promise<IBook>;
  getBooks(): Promise<IBook[]>;
  updateBook(book: IBook): Promise<IBook>;
  deleteBook(id: string): void;
}
