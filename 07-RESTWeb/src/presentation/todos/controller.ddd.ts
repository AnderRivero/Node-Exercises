import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain/ index";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) =>
    res.json(await this.todoRepository.getAll());

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ error: "ID argument is not a number" });
    }
    try {
      const todo = await this.todoRepository.findById(+id);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const createTodoDto = CreateTodoDTO.create(req.body);
    const [error, todoDto] = createTodoDto;

    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.create(todoDto!);
    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ error: "ID argument is not a number" });
    }
    
    const deletedTodo = await this.todoRepository.deleteById(+id);

    res.json(deletedTodo);
  };
}
