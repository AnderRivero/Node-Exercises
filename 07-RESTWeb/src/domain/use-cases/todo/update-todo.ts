import { TodoEntity, TodoRepository, UpdateTodoDTO } from "../../ index";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
