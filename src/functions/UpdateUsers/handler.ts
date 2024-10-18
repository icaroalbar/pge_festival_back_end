import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UploadImagePerfilGateway } from "@services/CreateUsers/uploadIagePerfilGateway";
import { UpdateUserRepository } from "@services/UpdateUsers/updateUser.repository";
import { UpdateUserUseCase } from "@services/UpdateUsers/updateUser.useCase";
import { InputUpdateUser } from "@services/UpdateUsers/updateUsers.dto";
import multipart from "lambda-multipart-parser";

const handler = async (event) => {
  const body = await multipart.parse(event);

  const input: InputUpdateUser = {
    id: Number(body.id),
    primeiroNome: body.primeiroNome,
    ultimoNome: body.ultimoNome,
    setor: body.setor,
    files: body.files,
  };

  try {
    const updateUserRepository = new UpdateUserRepository();
    const uploadImagePerfilGateway = new UploadImagePerfilGateway();
    const updateUserUseCase = new UpdateUserUseCase(
      uploadImagePerfilGateway,
      updateUserRepository
    );
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
