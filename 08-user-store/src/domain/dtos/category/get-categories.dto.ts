export class GetCategoriesDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static get(object: { [key: string]: any }): [string?, GetCategoriesDto?] {
    const { id, name, available = false } = object;
    let availableBoolean = available;
    if (!id) return ["Missing id"];
    if (!name) return ["Missing name"];
    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }
    return [undefined, new GetCategoriesDto(id, name, availableBoolean)];
  }
}
