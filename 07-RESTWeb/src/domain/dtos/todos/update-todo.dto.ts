export class UpdateTodoDTO {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = new Date(this.completedAt);
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { id, text, completedAt } = props;

    if (!id || isNaN(Number(id))) {
      return [`id must be a valid number`];
    }

    let completedAtDate = completedAt;

    if (completedAt) {
      completedAtDate = new Date(completedAt);
      if (completedAtDate.toString() === "Invalid Date") {
        return ["CompletedAT must be a valid date", undefined];
      }
    }
    return [undefined, new UpdateTodoDTO(id, text, completedAt)];
  }
}
