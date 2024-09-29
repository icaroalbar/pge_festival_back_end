import { db } from "@libs/database";
import { InputUpdateUser } from "./updateUsers.dto";

export class UpdateUserRepository {
  async update(input: InputUpdateUser): Promise<void> {
    const { setor, primeiroNome, ultimoNome, id } = input as InputUpdateUser;

    return new Promise((resolve, reject) => {
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
            console.error("Erro ao buscar usuários:", err);
            return reject(err);
          }

          if (results.length === 0) {
            return reject(new Error("Usuário ou senha incorreta."));
          }

          resolve(results);
        }
      );
    });
  }
}
