import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { InputNewPasswordUsers } from "@services/NewPasswordUsers/newPasswordUsers.dto";
import { NewPasswordUsersRepository } from "@services/NewPasswordUsers/newPasswordUsers.repository";
import { NewPasswordUsersUseCase } from "@services/NewPasswordUsers/newPasswordUsers.useCase";

const handler = async (event) => {
  const input = event.body as InputNewPasswordUsers;
  try {
    const newPasswordUsersRepository = new NewPasswordUsersRepository();
    const newPasswordUsersUseCase = new NewPasswordUsersUseCase(
      newPasswordUsersRepository
    );
    await newPasswordUsersUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
