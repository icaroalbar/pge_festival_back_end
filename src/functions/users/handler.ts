import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UserUseCase } from "@services/FindAllUsres/finAllUsers.useCase";
import { UserRepository } from "@services/FindAllUsres/findAllUsers.repository";

const handler = async (event) => {
  const { email, senha } = event.body;
  try {
    const usersRepository = new UserRepository();
    const usersUseCase = new UserUseCase(usersRepository);
    const response = await usersUseCase.execute(email, senha);

    return formatJSONResponse(200, response);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
