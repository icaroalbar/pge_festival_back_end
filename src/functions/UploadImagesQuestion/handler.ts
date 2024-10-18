import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import multipart from "lambda-multipart-parser";
import { InputUploadImageQuestions } from "@services/UploadImagesQuestions/uploadImageQuestions.dto";
import { UploadImageQuestionsRepository } from "@services/UploadImagesQuestions/uploadImageQuestions.repository";
import { UploadImageQuestionsUseCase } from "@services/UploadImagesQuestions/uploadImageQuestions.useCase";
import { UploadImageQuestionsGateway } from "@services/UploadImagesQuestions/uploadImageQuestions.gateway";

const handler = async (event) => {
  const body = await multipart.parse(event);

  const input: InputUploadImageQuestions = {
    user: Number(body.user),
    question: Number(body.question),
    files: body.files,
  };

  const uploadImageQuestionsRepository = new UploadImageQuestionsRepository();
  const uploadImageQuestionsGateway = new UploadImageQuestionsGateway();
  const uploadImageQuestionsUseCase = new UploadImageQuestionsUseCase(
    uploadImageQuestionsRepository,
    uploadImageQuestionsGateway
  );

  try {
    await uploadImageQuestionsUseCase.execute(input);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
