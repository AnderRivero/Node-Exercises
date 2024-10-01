export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {}

  execute({ base = 1, limit = 10 }: CreateTableOptions): string {
    let table = ``;
    for (let i = 1; i <= limit; i++) {
      table += `${base} x ${i} = ${base * i}`;
      if (i < limit) table += "\n";
    }
    return table;
  }
}
