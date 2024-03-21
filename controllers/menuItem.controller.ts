import { Request, Response } from "express";
import {
  createMenuItem,
  getAllMenuItem,
  getMenuItemById,
  updateMenuItemById,
  deleteMenuItem,
  getAllMenuItemByRestaurantId,
} from "../models/menuItem/menuItem.query";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { recommendationInterface } from "../interfaces/recommendation.interface";

export const createMenuItemController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const objectOfMenuItem = req.body;
    const resId = req.user?.employeeInformation.restaurantId;
    if (resId) {
      objectOfMenuItem.restaurantId = resId;
    } else {
      console.error("Restaurant ID is not available.");
    }

    let menuItems: any[] = [];
    if (Array.isArray(objectOfMenuItem)) {
      objectOfMenuItem.map(async (item) => {
        const menuItem = await createMenuItem(item);
        menuItems.push(menuItem);
      });
      res.status(201).json(menuItems);
    }

    const menuItem = await createMenuItem(objectOfMenuItem);
    res.status(201).json(menuItem);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllMenuItemController = async (req: Request, res: Response) => {
  try {
    const allMenuItem = await getAllMenuItem();
    res.status(200).json(allMenuItem);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getMenuItemByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id: string = req.params.id;
    const oneMenuItem = await getMenuItemById(id);
    res.status(200).json(oneMenuItem);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const updateMenuItemByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    
    const id: string = req.params.id;
    const menuItemObject = { ...req.body };

    const updatedmemuItem = await updateMenuItemById(id, menuItemObject);
    console.log("updated item ====", updatedmemuItem);

    res.status(200).send(updatedmemuItem);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const deleteMenuItemController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedmenuItem = deleteMenuItem(id);
    res.json(deletedmenuItem);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllMenuItemByRestaurantIdController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const resId: number = Number(req.user?.employeeInformation.restaurantId);
    const mealItems = await getAllMenuItemByRestaurantId(resId);
    res.status(200).json(mealItems);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllMenuItemByRestaurantIdForRecommendation = async (
  req: Request,
  res: Response
) => {
  try {
    const recommendationArray: number[] = req.body.ids;

    let menuItemForRecommendationEngine: any[] = [];
    let promises = recommendationArray.map(async (restaurantId: number) => {
      console.log("res", restaurantId);
      console.log("res type is: ", typeof restaurantId);

      const mealItems = await getAllMenuItemByRestaurantId(restaurantId);
      console.log("mealItems", mealItems);
      let items = mealItems.map((item) => {
        return {
          _id: item._id,
          itemName: item.item?.itemName,
          itemProfileTastyTags: item.item?.itemProfileTastyTags,
        };
      });

      menuItemForRecommendationEngine.push({
        restaurantId: restaurantId,
        items: items,
      });
      return items;
    });
    const result = await Promise.all(promises);
    console.log("recommendation", menuItemForRecommendationEngine);

    res.status(200).json(menuItemForRecommendationEngine);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

export const getAllMenuItemForMP = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const mealItems = await getAllMenuItemByRestaurantId(id);
    res.status(200).json(mealItems);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};
