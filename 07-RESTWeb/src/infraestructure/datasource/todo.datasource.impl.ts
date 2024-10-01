import { prisma } from "../../data/postgres";
import {
  CreateTodoDTO,
  CustomError,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDTO,
} from "../../domain/ index";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto });
    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObject);
  }
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id: +id } });
    if (!todo) throw new CustomError(`TODO with id ${id} not found`, 404);
    return TodoEntity.fromObject(todo);
  }
  async update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(updateTodoDTO.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObject(deleted);
  }
}
