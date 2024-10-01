import { CreateTodoDTO, TodoEntity, TodoRepository } from "../../ index";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: CreateTodoDTO): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
