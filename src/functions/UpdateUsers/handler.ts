import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UpdateUserRepository } from "@services/UpdateUsers/updateUser.repository";
import { UpdateUserUseCase } from "@services/UpdateUsers/updateUser.useCase";
import { InputUpdateUser } from "@services/UpdateUsers/updateUsers.dto";

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
