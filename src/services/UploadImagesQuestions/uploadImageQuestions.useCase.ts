import { InputUploadImageQuestions } from "./uploadImageQuestions.dto";
import { randomUUID, UUID } from "node:crypto";
import { UploadImageQuestionsRepository } from "./uploadImageQuestions.repository";
import { UploadImageQuestionsGateway } from "./uploadImageQuestions.gateway";

export class UploadImageQuestionsUseCase {
  constructor(
    private uploadImageQuestionsRepository: UploadImageQuestionsRepository,
    private uploadImageQuestionsGateway: UploadImageQuestionsGateway
  ) {}

  async execute(input: InputUploadImageQuestions): Promise<void> {
    const nomeArquivo: UUID = randomUUID();
    await this.uploadImageQuestionsRepository.upload(input, nomeArquivo);
    await this.uploadImageQuestionsGateway.upload(input, nomeArquivo);
  }
}
