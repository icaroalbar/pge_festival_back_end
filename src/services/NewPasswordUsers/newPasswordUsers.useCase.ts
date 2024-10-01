import { InputNewPasswordUsers } from "./newPasswordUsers.dto";
import { NewPasswordUsersRepository } from "./newPasswordUsers.repository";

export class NewPasswordUsersUseCase {
  constructor(private newPasswordUsersRepository: NewPasswordUsersRepository) {}

  async execute(input: InputNewPasswordUsers): Promise<void> {
    await this.newPasswordUsersRepository.update(input);
  }
}
