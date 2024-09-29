import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { InputCreateUser } from "@services/createUsers/createUsers.dto";
import { CreateUserRepository } from "@services/createUsers/createUsers.repository";
import { CreateUserUseCase } from "@services/createUsers/createUsers.usecase";

const handler = async (event) => {
  const input = event.body as InputCreateUser;
  try {
    const createUserRepository = new CreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(createUserRepository);
    await createUserUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
