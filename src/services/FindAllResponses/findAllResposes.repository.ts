import { db } from "@libs/database";

export class ResponsesRepository {
  async findAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM answerOptions`, (err, results) => {
        if (err) {
          console.error("Erro ao buscar respostas:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
