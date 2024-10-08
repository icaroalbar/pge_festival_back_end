import { db } from "@libs/database";
import { InputUploadImageQuestions } from "./uploadImageQuestions.dto";
import { UUID } from "node:crypto";

export class UploadImageQuestionsRepository {
  async upload(
    input: InputUploadImageQuestions,
    nomeArquivo: UUID
  ): Promise<void> {
    const { user, question } = input;

    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO imagesQuestions (user, question, nomeArquivo) 
         VALUES (?, ?, ?)`,
        [user, question, nomeArquivo],

        (err) => {
          if (err) {
            console.error("Erro ao adicionar arquivo:", err);

            return reject({
              message:
                "Erro interno ao adicionar arquivo. Tente novamente mais tarde.",
              code: "INTERNAL_ERROR",
            });
          }
          resolve();
        }
      );
    });
  }
}
