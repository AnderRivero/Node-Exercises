import fs from "fs";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    destination = "outputs",
    fileName = "table",
  }: Options): boolean {
    try {
      const outputPath = `./src/documents/${destination}/`;
      fs.mkdirSync(outputPath, { recursive: true });
      fs.writeFileSync(`${outputPath}${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}