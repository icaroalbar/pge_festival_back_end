import { InputCreateUser } from "./createUsers.dto";
import { CreateUserRepository } from "./createUsers.repository";

export class CreateUserUseCase {
  constructor(private createUserRepository: CreateUserRepository) {}
  async execute(input: InputCreateUser): Promise<void> {
    await this.createUserRepository.create(input);
  }
}
