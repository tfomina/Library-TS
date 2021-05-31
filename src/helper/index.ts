import fs from "fs";

export const requiredMessage: string = "Обязательное поле";

export const deleteFileFromDisk = (fileBook: string): void => {
  if (fileBook) {
    try {
      fs.unlinkSync(fileBook);
    } catch (err) {
      console.error(err);
    }
  }
};
