import { UpdateUserRepository } from "./updateUser.repository";
import { InputUpdateUser } from "./updateUsers.dto";

export class UpdateUserUseCase {
  constructor(private updateUserRepository: UpdateUserRepository) {}

  async execute(input: InputUpdateUser): Promise<void> {
    await this.updateUserRepository.update(input);
  }
}
