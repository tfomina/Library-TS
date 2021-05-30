import multer from "multer";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, "public/files");
  },
  filename(req: any, file: any, cb: any) {
    const { fileName } = req.body;
    const extention = file.originalname.split(".").pop();
    cb(null, `${fileName.replace(/\s/g, "-")}-${nanoid()}.${extention}`);
  },
});

// .txt, .pdf, .doc, .docx, .epub, .fb2
const allowedFileTypes = [
  "text/plain",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/epub+zip",
  "application/fb2",
];

const fileFilter = (req: any, file: any, cb: any) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileMiddleware = multer({
  storage,
  fileFilter,
});
