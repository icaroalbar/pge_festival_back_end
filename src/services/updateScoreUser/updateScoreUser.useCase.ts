import { InputUpdateScoreUser } from "./updateScoreUser.dto";
import { UpdateScoreUserRepository } from "./updateScoreUser.repository";

export class UpdateScoreUserUseCase {
  constructor(private updateScoreUserRepositiry: UpdateScoreUserRepository) {}

  async execute(input: InputUpdateScoreUser): Promise<void> {
    await this.updateScoreUserRepositiry.update(input);
  }
}
