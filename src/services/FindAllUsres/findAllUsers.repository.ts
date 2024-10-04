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
    const imagePerfil = email.replace("@", "%40");
    const urlImage = `https://pge-festival.s3.amazonaws.com/images-perfil/${imagePerfil}`;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, email, setor, score, lastQuestion, primeiroNome, ultimoNome, timer, ? AS urlImage 
         FROM users WHERE email = ? AND senha = ?`,
        [urlImage, email, password],
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
