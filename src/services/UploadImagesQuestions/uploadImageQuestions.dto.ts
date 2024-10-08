export interface InputUploadImageQuestions {
  user: number;
  question: number;
  files?: { content: Buffer; filename: string; contentType: string }[];
}
