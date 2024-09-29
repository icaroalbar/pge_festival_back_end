import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { InputFindRankingFive } from "@services/findRankingFive/findRankingFive.dto";
import { FindRankingFiveRepository } from "@services/findRankingFive/findRankingFive.repository";
import { FindRankingFiveUseCase } from "@services/findRankingFive/findRankingFive.useCase";

const handler = async (event) => {
  const input = event.pathParameters.id as InputFindRankingFive;
  try {
    const findRankingFiveRepository = new FindRankingFiveRepository();
    const findRankingFiveUseCase = new FindRankingFiveUseCase(
      findRankingFiveRepository
    );
    const response = await findRankingFiveUseCase.execute(input);

    return formatJSONResponse(200, response);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
