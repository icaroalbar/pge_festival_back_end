import { UploadImagePerfilGateway } from "@services/CreateUsers/uploadIagePerfilGateway";
import { UpdateUserRepository } from "./updateUser.repository";
import { InputUpdateUser } from "./updateUsers.dto";

export class UpdateUserUseCase {
  constructor(
    private uploadImagePerfilGateway: UploadImagePerfilGateway,
    private updateUserRepository: UpdateUserRepository
  ) {}

  async execute(input: InputUpdateUser): Promise<void> {
    const UpdateUserAndReturningEmail = await this.updateUserRepository.update(
      input
    );

    if (!!input.files) {
      input.email = UpdateUserAndReturningEmail;
      await this.uploadImagePerfilGateway.upload(input);
    }
  }
}
