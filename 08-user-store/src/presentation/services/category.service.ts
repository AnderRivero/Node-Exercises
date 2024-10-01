import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";
import { GetCategoriesDto } from "../../domain/dtos/category/get-categories.dto";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExists) throw CustomError.badRequest("Category already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;

      const [total, allCategories] = await Promise.all([
        CategoryModel.countDocuments(),
        (
          await CategoryModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
        ).map((category) => GetCategoriesDto.get(category).at(1)),
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        previous:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: allCategories,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
