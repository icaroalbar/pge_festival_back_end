import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import multipart from "lambda-multipart-parser";
import { InputCreateUser } from "@services/CreateUsers/createUsers.dto";
import { CreateUserRepository } from "@services/CreateUsers/createUsers.repository";
import { CreateUserUseCase } from "@services/CreateUsers/createUsers.usecase";
import { UploadImagePerfilGateway } from "@services/CreateUsers/uploadIagePerfilGateway";

const handler = async (event) => {
  const body = await multipart.parse(event);

  const input: InputCreateUser = {
    email: body.email,
    senha: body.senha,
    primeiroNome: body.primeiroNome,
    ultimoNome: body.ultimoNome,
    setor: body.setor,
    files: body.files,
  };

  const createUserRepository = new CreateUserRepository();
  const uploadImagePerfilGateway = new UploadImagePerfilGateway();
  const createUserUseCase = new CreateUserUseCase(
    uploadImagePerfilGateway,
    createUserRepository
  );

  try {
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
