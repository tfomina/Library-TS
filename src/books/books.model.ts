import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { requiredMessage } from "../helper";

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, requiredMessage],
  },
  description: String,
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String,
  fileBook: String,
});

export const Book = mongoose.model("Book", BookSchema);
