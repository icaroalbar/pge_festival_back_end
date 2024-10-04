import { region } from "@libs/aws-region";
import { InputCreateUser } from "./createUsers.dto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { InputUpdateUser } from "@services/UpdateUsers/updateUsers.dto";

export class UploadImagePerfilGateway {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client(region);
  }

  async upload(input: InputCreateUser | InputUpdateUser): Promise<void> {
    const file = input.files[0];

    if (!file || !file.content) {
      throw new Error("Não possui documentos.");
    }

    const contentType = file.contentType;
    const bucket = `${process.env.BUCKET_PERFIL}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: `images-perfil/${input?.email}`,
      Body: file.content,
      ContentType: contentType,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      console.error(error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}
