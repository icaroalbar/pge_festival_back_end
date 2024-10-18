import { db } from "@libs/database";
import { InputUpdateUser } from "./updateUsers.dto";

export class UpdateUserRepository {
  async update(input: InputUpdateUser): Promise<string | null> {
    const { setor, primeiroNome, ultimoNome, id } = input as InputUpdateUser;

    return new Promise((resolve, reject) => {
      // Atualiza o usuário
      db.query(
        `UPDATE users
          SET
            setor = COALESCE(NULLIF(?, ''), setor),
            primeiroNome = COALESCE(NULLIF(?, ''), primeiroNome),
            ultimoNome = COALESCE(NULLIF(?, ''), ultimoNome)
          WHERE id = ?;`,
        [setor, primeiroNome, ultimoNome, id],

        (err, results) => {
          if (err) {
            console.error("Erro ao atualizar usuário:", err);
            return reject(err);
          }

          // Verifica se a atualização foi bem-sucedida
          if (results.affectedRows === 0) {
            return reject(
              new Error("Usuário não encontrado ou nenhum campo atualizado.")
            );
          }

          // Consulta o e-mail do usuário atualizado
          db.query(
            `SELECT email FROM users WHERE id = ?;`,
            [id],
            (err, results) => {
              if (err) {
                console.error("Erro ao buscar e-mail do usuário:", err);
                return reject(err);
              }

              // Verifica se o usuário foi encontrado
              if (results.length === 0) {
                return resolve(null); // ou você pode rejeitar a promessa, dependendo do seu caso de uso
              }

              // Retorna o e-mail do usuário
              resolve(results[0].email);
            }
          );
        }
      );
    });
  }
}
