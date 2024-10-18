import { SendEmailForgotPassword } from "./sendEmailForgotPassword.dto";
import { SendEmailForgotPasswordRepository } from "./sendEmailForgotPassword.repository";

export class SendEmailForgotPasswordUseCase {
  constructor(
    private sendEmailForgotPasswordRepository: SendEmailForgotPasswordRepository
  ) {}

  async execute(input: SendEmailForgotPassword): Promise<void> {
    await this.sendEmailForgotPasswordRepository.send(input);
  }
}
