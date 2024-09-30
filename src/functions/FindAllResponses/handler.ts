import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ResponsesUseCase } from "@services/FindAllResponses/findAllResponses.useCase";
import { ResponsesRepository } from "@services/FindAllResponses/findAllResposes.repository";
const handler = async () => {
  try {
    const responsesRepository = new ResponsesRepository();
    const responsesUseCase = new ResponsesUseCase(responsesRepository);
    const response = await responsesUseCase.execute();

    return formatJSONResponse(200, response);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
