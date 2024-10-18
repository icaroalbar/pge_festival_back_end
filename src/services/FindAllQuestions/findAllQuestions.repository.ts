import { db } from "@libs/database";

export interface OutputQuestion {
  questionNum: number;
  question: string;
  correctAnswer: string;
  answerOptions: string[];
}

export class QuestionsRepository {
  async findAll(): Promise<OutputQuestion[]> {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM quizCollection`, (err, results) => {
        if (err) {
          console.error("Erro ao buscar respostas:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
