import { transporter } from "@libs/nodemailer";
import { SendEmailForgotPassword } from "./sendEmailForgotPassword.dto";

export class SendEmailForgotPasswordRepository {
  async send(input: SendEmailForgotPassword): Promise<void> {
    await transporter.sendMail({
      from: '"Suporte PGamres" <moreirasd@pge.rj.gov.br>',
      to: input.email,
      subject: "Recuperação de senha PGames",
      text: `https://pge-festival.vercel.app/newPassword?email=${input.email}`,
      html: `<p>
              Para criar sua nova senha${" "}
              <a href="https://pge-festival.vercel.app/newPassword?email=${
                input.email
              }">
                clique aqui
              </a>
            </p>`,
    });
  }
}
