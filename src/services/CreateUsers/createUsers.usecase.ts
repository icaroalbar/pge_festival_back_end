import { InputCreateUser } from "./createUsers.dto";
import { CreateUserRepository } from "./createUsers.repository";
import { UploadImagePerfilGateway } from "./uploadIagePerfilGateway";

export class CreateUserUseCase {
  constructor(
    private uploadImagePerfilGateway: UploadImagePerfilGateway,
    private createUserRepository: CreateUserRepository
  ) {}

  async execute(input: InputCreateUser): Promise<void> {
    if (!input.files.length) {
      await this.createUserRepository.create(input);
    } else {
      await Promise.all([
        this.createUserRepository.create(input),
        this.uploadImagePerfilGateway.upload(input),
      ]);
    }
  }
}
