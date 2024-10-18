import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { SendEmailForgotPassword } from "@services/SendEmailForgotPassword/sendEmailForgotPassword.dto";
import { SendEmailForgotPasswordRepository } from "@services/SendEmailForgotPassword/sendEmailForgotPassword.repository";
import { SendEmailForgotPasswordUseCase } from "@services/SendEmailForgotPassword/sendEmailForgotPassword.useCase";

const handler = async (event) => {
  const input = event.body as SendEmailForgotPassword;
  try {
    const sendEmailForgotPasswordRepository =
      new SendEmailForgotPasswordRepository();

    const sendEmailForgotPasswordUseCase = new SendEmailForgotPasswordUseCase(
      sendEmailForgotPasswordRepository
    );
    await sendEmailForgotPasswordUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
