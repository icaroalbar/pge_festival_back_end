import { db } from "@libs/database";

export interface OutputUser {
  id: number;
  email: string;
  setor: string;
  urlImage: string;
  score: number;
  lastQuestion: number;
  primeiroNome: string;
  ultimoNome: string;
  timer: number;
}

export class UserRepository {
  async findAll(email: string, password: string): Promise<OutputUser[]> {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, email, setor, urlImage, score, lastQuestion, primeiroNome, ultimoNome, timer 
         FROM users WHERE email = ? AND senha = ?`,
        [email, password],
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
