import { InputFindRankingFive, OutputFindRanking } from "./findRankingFive.dto";
import { FindRankingFiveRepository } from "./findRankingFive.repository";

export class FindRankingFiveUseCase {
  constructor(private findRankingFiveRepository: FindRankingFiveRepository) {}

  async execute(id: InputFindRankingFive): Promise<OutputFindRanking> {
    return await this.findRankingFiveRepository.find(id);
  }
}
