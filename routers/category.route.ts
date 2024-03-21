import express from 'express';
import { createCategoryController, getAllCategoriesController, getCategoriesByIdController,updateCategoryByIdController,deleteCategoryController, getcategoryByUsingCategoryIdController, getAllCategoryByRestaurantIdController } from '../controllers/category.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router()

router.get('/', getAllCategoriesController);
router.get('/findOne/:id', getcategoryByUsingCategoryIdController);
router.get('/:id', getCategoriesByIdController);
router.get('/restaurant/:id', authMiddleware,getAllCategoryByRestaurantIdController);
router.post('/create',authMiddleware,createCategoryController);
router.put('/edit/:id', updateCategoryByIdController);
router.delete('/delete/:id', deleteCategoryController);


export  default  router;

