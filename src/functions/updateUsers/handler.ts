import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UpdateUserRepository } from "@services/updateUsers/updateUser.repository";
import { UpdateUserUseCase } from "@services/updateUsers/updateUser.useCase";
import { InputUpdateUser } from "@services/updateUsers/updateUsers.dto";

const handler = async (event) => {
  const input = event.body as InputUpdateUser;
  try {
    const updateUserRepository = new UpdateUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(updateUserRepository);
    await updateUserUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
