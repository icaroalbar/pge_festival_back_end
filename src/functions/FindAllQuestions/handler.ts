import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { QuestionsRepository } from "@services/FindAllQuestions/findAllQuestions.repository";
import { QuestionsUseCase } from "@services/FindAllQuestions/findAllQuestions.useCase";

const handler = async () => {
  try {
    const questionsRepository = new QuestionsRepository();
    const questionsUseCase = new QuestionsUseCase(questionsRepository);
    const response = await questionsUseCase.execute();

    return formatJSONResponse(200, response);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
