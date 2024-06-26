import express, { Request, Response, Router } from "express";
const router = express.Router();
import axios from "axios";

const cors = require("cors");
const app = express();

app.use(cors());

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const externalServerUrl =
      "https://inventory-server-klzl.onrender.com/v1/ingredient/restaurant/1";

    const response = await axios.get(externalServerUrl);
    const externalData = response.data;

    const selectedData = externalData.ingredients.map((ingredient: any) => ({
      id: ingredient.id,
      ingredientName: ingredient.ingredientName,
      unitOfStock: ingredient.unitOfStock,
      costPerUnit: ingredient.costPerUnit,
      caloriesPerUnit: ingredient.caloriesPerUnit,
      liquid: ingredient.liquid,
    }));
    console.log(selectedData);

    res.send(selectedData);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

router.get("/getAllPacking", async (req: Request, res: Response) => {
  try {
    const externalServerUrl =
      "https://inventory-server-klzl.onrender.com/v1/deliveryBox/restaurant/1";

    const response = await axios.get(externalServerUrl);
    const externalData = response.data;

    const selectedData = externalData.deliveryBoxes.map((deliveryBox: any) => ({
      id: deliveryBox.id,
      boxName: deliveryBox.boxName,
      currentStockQuantity: deliveryBox.currentStockQuantity,
      unitOfPrice: deliveryBox.unitOfPrice,
      costPerUnit: deliveryBox.costPerUnit,
      reorderPoint: deliveryBox.reorderPoint,
      unitOfDimentions: deliveryBox.unitOfDimentions,
      dimensions: deliveryBox.dimensions,
      weightLimit: deliveryBox.weightLimit,
      temperatureLimit: deliveryBox.temperatureLimit,
      waterproof: deliveryBox.waterproof,
      expectedStockForToday: deliveryBox.expectedStockForToday,
      expectedStockForTomorrow: deliveryBox.expectedStockForTomorrow,
      restaurantId: deliveryBox.restaurantId,
      createdAt: deliveryBox.createdAt,
      updatedAt: deliveryBox.updatedAt,
    }));
    console.log(selectedData);

    res.send(selectedData);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

export default router;
