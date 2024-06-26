import { Request, Response } from "express";
import {
  getAllCategoryByRestaurantId,
  createCategory,
  getAllCategories,
  getCategoriesById,
  updateCategoryById,
  deleteCategory,
  getcategoryByUsingCategoryId,
} from "../models/categories/category.query";
import { AuthRequest } from "../interfaces/authRequest.interface";

export const createCategoryController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const objectOfCategory = { ...req.body };
    const resId = req.user?.employeeInformation.restaurantId;
    if (resId) {
      objectOfCategory.restaurantId = resId;
    } else {
      // Handle the case when restaurantId is not available
      console.error("Restaurant ID is not available.");
    }
    const category = await createCategory(objectOfCategory);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const allCategories = await getAllCategories();
    res.status(200).json(allCategories);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};
//Find all Items Under the category
export const getCategoriesByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const categories = await getCategoriesById(id);
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const updateCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const categoryObject = { ...req.body };
    const updatedCategory = await updateCategoryById(id, categoryObject);
    res.json(updatedCategory);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedCategory = await deleteCategory(id);
    res.json(deletedCategory);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

//Find All categories

export const getcategoryByUsingCategoryIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id: string = req.params.id;
    const category = await getcategoryByUsingCategoryId(id);
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllCategoryByRestaurantIdController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const resId: number = Number(req.user?.employeeInformation.restaurantId);

    const category = await getAllCategoryByRestaurantId(resId);
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};
