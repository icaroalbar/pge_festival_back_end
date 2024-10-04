import { InputCreateUser } from "./createUsers.dto";
import { CreateUserRepository } from "./createUsers.repository";
import { UploadImagePerfilGateway } from "./uploadIagePerfilGateway";

export class CreateUserUseCase {
  constructor(
    private uploadImagePerfilGateway: UploadImagePerfilGateway,
    private createUserRepository: CreateUserRepository
  ) {}

  async execute(input: InputCreateUser): Promise<void> {
    await Promise.all([
      this.uploadImagePerfilGateway.upload(input),
      this.createUserRepository.create(input),
    ]);
  }
}
