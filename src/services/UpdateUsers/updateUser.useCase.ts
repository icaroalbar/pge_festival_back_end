import { UploadImagePerfilGateway } from "@services/CreateUsers/uploadIagePerfilGateway";
import { UpdateUserRepository } from "./updateUser.repository";
import { InputUpdateUser } from "./updateUsers.dto";

export class UpdateUserUseCase {
  constructor(
    private uploadImagePerfilGateway: UploadImagePerfilGateway,
    private updateUserRepository: UpdateUserRepository
  ) {}

  async execute(input: InputUpdateUser): Promise<void> {
    try {
      const updatedUserEmail = await this.updateUserRepository.update(input);
      input.email = updatedUserEmail;

      if (Array.isArray(input.files) && input.files.length > 0) {
        await this.uploadImagePerfilGateway.upload(input);
      }
    } catch (error) {
      console.error("Error updating user or uploading image:", error);
      throw new Error("Failed to update user or upload image.");
    }
  }
}
