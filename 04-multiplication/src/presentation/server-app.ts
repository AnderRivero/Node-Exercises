import { CreateTable } from "../domain/use-cases/create-table.usecase";
import { SaveFile } from "../domain/use-cases/save-file.usecase";

export interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static run({ base, limit, name, destination, showTable }: RunOptions) {
    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      destination,
      fileName: name,
    });

    wasCreated
      ? console.log(`File created`)
      : console.log(`File not created`);

    if (showTable) console.log(table);
  }
}
