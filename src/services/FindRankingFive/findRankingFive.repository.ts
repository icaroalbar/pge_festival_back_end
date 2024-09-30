import { db } from "@libs/database";
import { InputFindRankingFive, OutputFindRanking } from "./findRankingFive.dto";

export class FindRankingFiveRepository {
  async find(id: InputFindRankingFive): Promise<OutputFindRanking> {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT score, primeiroNome, ultimoNome, position FROM (
          -- Seleciona os 5 primeiros do ranking
          (
            SELECT score, primeiroNome, ultimoNome, NULL AS position
            FROM users
            ORDER BY score DESC
            LIMIT 5
          )
          UNION ALL
          -- Seleciona o usuário atual com sua posição no ranking
          (
            SELECT u.score, u.primeiroNome, u.ultimoNome,
            (
              SELECT COUNT(*) + 1
              FROM users
              WHERE score > u.score
            ) AS position
            FROM users u
            WHERE u.id = ?
          )
        ) AS combined_results;`,
        [id],
        (err, results) => {
          if (err) {
            console.error("Erro ao buscar os dados:", err);
            return reject(err);
          }

          const userScoreData = results.find(
            (result: any) => result.position !== null
          );
          const userScore = userScoreData?.score || 0;
          const userPosition = userScoreData?.position || 0;

          const ranking = results.filter(
            (result: any) => result.position === null
          );

          resolve({
            ranking,
            scoreUser: {
              score: userScore,
              position: userPosition,
            },
          });
        }
      );
    });
  }
}
