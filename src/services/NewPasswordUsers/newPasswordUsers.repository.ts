import { db } from "@libs/database";
import { InputNewPasswordUsers } from "./newPasswordUsers.dto";

export class NewPasswordUsersRepository {
  async update(input: InputNewPasswordUsers): Promise<void> {
    const { email, password } = input as InputNewPasswordUsers;

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users
            SET
              senha = COALESCE(NULLIF(?, ''), senha)
            WHERE email = ?`,
        [password, email],

        (err, results) => {
          if (err) {
            console.error("Erro ao atualizar os dados:", err);
            return reject(err);
          }

          resolve(results);
        }
      );
    });
  }
}
