export interface InputUpdateUser {
  id: number;
  email?: string;
  primeiroNome: string;
  ultimoNome: string;
  setor: string;
  files?: { content: Buffer; filename: string; contentType: string }[];
}
