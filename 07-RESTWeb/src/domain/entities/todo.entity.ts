export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object;
    if (!id) throw "id is required";
    if (!text) throw "ext is required";

    let completedAtAsDate;

    if (completedAt) {
      completedAtAsDate = new Date(completedAt);
      if (isNaN(completedAtAsDate.getTime())) {
        throw "CompletedAt is not a valid date";
      }
    }

    return new TodoEntity(id, text, completedAt);
  }
}
