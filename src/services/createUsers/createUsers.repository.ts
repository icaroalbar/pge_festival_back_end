import { db } from "@libs/database";
import { InputCreateUser } from "./createUsers.dto";

export class CreateUserRepository {
  async create(input: InputCreateUser): Promise<void> {
    const { email, senha, primeiroNome, ultimoNome, setor } = input;

    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (email, senha, primeiroNome, ultimoNome, setor, score, lastQuestion) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [email, senha, primeiroNome, ultimoNome, setor, 0, 1],
        (err) => {
          if (err) {
            console.error("Erro ao criar usuário:", err);
            if (err.code === "ER_DUP_ENTRY") {
              return reject({
                message: "Este e-mail já está em uso. Tente outro e-mail.",
                code: "EMAIL_DUPLICATE",
              });
            }
            return reject({
              message:
                "Erro interno ao criar o usuário. Tente novamente mais tarde.",
              code: "INTERNAL_ERROR",
            });
          }
          resolve();
        }
      );
    });
  }
}
