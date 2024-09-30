import { OutputUser, UserRepository } from "./findAllUsers.repository";

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<OutputUser[]> {
    return await this.userRepository.findAll(email, password);
  }
}
