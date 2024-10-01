import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
  abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>;

  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;

  abstract update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;

  abstract delete(id: number): Promise<TodoEntity>;
}
