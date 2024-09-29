import { ResponsesRepository } from "./findAllResposes.repository";

export class ResponsesUseCase {
  constructor(private responsesRepository: ResponsesRepository) {}

  async execute(): Promise<any[]> {
    return await this.responsesRepository.findAll();
  }
}
