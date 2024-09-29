import { db } from "@libs/database";
import { InputUpdateScoreUser } from "./updateScoreUser.dto";

export class UpdateScoreUserRepository {
  async update(input: InputUpdateScoreUser): Promise<void> {
    const { id, score, lastQuestion } = input as InputUpdateScoreUser;

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users
          SET
            score = COALESCE(NULLIF(?, ''), score),
            lastQuestion = COALESCE(NULLIF(?, ''), lastQuestion)
          WHERE id = ?`,
        [score, lastQuestion, id],

        (err, results) => {
          if (err) {
            if (err.code === "ER_NO_REFERENCED_ROW_2") {
              console.error("Erro: Não existe a pergunta referenciada.", err);

              // Atualiza lastQuestion para 9999
              db.query(
                `UPDATE users
                  SET
                    score = COALESCE(NULLIF(?, ''), score),
                    lastQuestion = 9999
                  WHERE id = ?`,
                [score, id],
                (updateErr) => {
                  if (updateErr) {
                    console.error(
                      "Erro ao atualizar lastQuestion para 9999:",
                      updateErr
                    );
                    return reject(updateErr);
                  }
                  // Se a atualização for bem-sucedida, resolve a promise
                  return resolve(results);
                }
              );
              return; // Sai da função após a atualização do lastQuestion
            }
            console.error("Erro ao atualizar os dados:", err);
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  }
}
