import express, { Request, Response, NextFunction } from "express";
import { container } from "../../infrastructure/container";
import { BooksRepository } from "../../books/books.repository";
import { fileMiddleware } from "../middlewares/file";
import { deleteFileFromDisk } from "../../helper";

const router = express.Router();
const repository = container.get(BooksRepository);

// получить все книги
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await repository.getBooks();

    res.json({
      data: books,
      status: "ok",
    });
  } catch (err) {
    console.log(err);

    res.json({
      error: "Ошибка",
      status: "error",
    });
  }
});

// получить книгу по id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const book = await repository.getBook(id);

    if (book) {
      res.json({
        data: book,
        status: "ok",
      });
    } else {
      res.json({
        error: "Книга не найдена",
        status: "error",
      });
    }
  } catch (err) {
    console.log(err);

    res.json({
      error: "Ошибка",
      status: "error",
    });
  }
});

// создать книгу
router.post(
  "/create",
  fileMiddleware.single("fileBook"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, authors, favorite, fileCover } = req.body;

    let fileBook = "",
      fileName = "";
    if (req.file) {
      const { path, filename } = req.file;
      fileBook = path;
      fileName = filename;
    }

    try {
      await repository.createBook({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
      });

      res.json({
        status: "ok",
      });
    } catch (err) {
      console.log(err);
      deleteFileFromDisk(fileBook);

      res.json({
        error: "Ошибка",
        status: "error",
      });
    }
  }
);

// отреактировать книгу
router.put(
  "/:id",
  fileMiddleware.single("fileBook"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover } = req.body;

    let fileBook = "",
      fileName = "";
    if (req.file) {
      const { path, filename } = req.file;
      fileBook = path;
      fileName = filename;
    }

    try {
      await repository.updateBook({
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
      });
      res.json({
        status: "ok",
      });
    } catch (err) {
      console.log(err);
      deleteFileFromDisk(fileBook);

      res.json({
        error: "Ошибка",
        status: "error",
      });
    }
  }
);

// удалить книгу по id
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const book = await repository.getBook(id);

      if (book) {
        // удаление файла книги
        const { fileBook } = book;
        deleteFileFromDisk(fileBook as string);
      }

      await repository.deleteBook(id);

      res.json({
        status: "ok",
      });
    } catch (err) {
      console.log(err);

      res.json({
        error: "Ошибка",
        status: "error",
      });
    }
  }
);
