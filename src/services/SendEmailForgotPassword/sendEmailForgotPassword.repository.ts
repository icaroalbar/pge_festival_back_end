import { transporter } from "@libs/nodemailer";
import { SendEmailForgotPassword } from "./sendEmailForgotPassword.dto";

export class SendEmailForgotPasswordRepository {
  async send(input: SendEmailForgotPassword): Promise<void> {
    await transporter.sendMail({
      from: '"Suporte PG Gamres" <dsm.deborah@gmail.com>',
      to: input.email,
      subject: "Recuperação de senha PG Games",
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
