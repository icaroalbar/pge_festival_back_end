import {
  OutputQuestion,
  QuestionsRepository,
} from "./findAllQuestions.repository";

export class QuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(): Promise<OutputQuestion[]> {
    return await this.questionsRepository.findAll();
  }
}
