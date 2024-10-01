import { CreateTodoDTO, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDTO} from "../../domain/ index";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDTO);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.delete(id);
  }
}