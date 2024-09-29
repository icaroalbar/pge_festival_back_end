export interface InputFindRankingFive {
  id: number | string;
}

interface OutputFindRankingFive {
  score: number;
  primeiroNome: string;
  ultimoNome: string;
}

export interface OutputFindRanking {
  ranking: OutputFindRankingFive[];
  scoreUser: {
    score: number;
    position: number;
  };
}
