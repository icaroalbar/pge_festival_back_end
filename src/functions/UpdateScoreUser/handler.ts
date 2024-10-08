import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { InputUpdateScoreUser } from "@services/UpdateScoreUser/updateScoreUser.dto";
import { UpdateScoreUserRepository } from "@services/UpdateScoreUser/updateScoreUser.repository";
import { UpdateScoreUserUseCase } from "@services/UpdateScoreUser/updateScoreUser.useCase";

const handler = async (event) => {
  const input = event.body as InputUpdateScoreUser;
  try {
    const updateScoreUserRepository = new UpdateScoreUserRepository();
    const updateScoreUserUseCase = new UpdateScoreUserUseCase(
      updateScoreUserRepository
    );
    await updateScoreUserUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
