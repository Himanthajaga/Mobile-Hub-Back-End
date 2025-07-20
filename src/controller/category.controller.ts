import * as categoryService from '../services/category.service';
import { Request, Response } from 'express';
import { getFileUrl } from "../middleware/image.middleware";
export const getAllCategories = async (req:Request, res:Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log('Error retrieving categories:', error);
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
}
export const saveCategory = async (req: Request, res: Response) => {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file); // Debug log

        const { name, description } = req.body;

        if (!name || !description || !req.file) {
            return res.status(400).json({ error: "All fields and an image are required" });
        }
// Generate a unique ID for the category
        const id = await categoryService.generateUniqueId();
        const imageUrl = getFileUrl(req, req.file.filename);
        const category = {id ,name, description, image: imageUrl };
        const savedCategory = await categoryService.saveCategory(category);
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ message: "Error saving category", error });
    }
};
export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    if (isNaN(Number(categoryId))) {
        res.status(400).json({
            error: 'Invalid category ID'
        });
        return;
    }
    try {
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        console.log('Error retrieving category:', error);
        res.status(500).json({ message: 'Error retrieving category', error });
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    try {
        // Check if the category exists
        const existingCategory = await categoryService.getCategoryById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Handle the image update
        let imageUrl = existingCategory.image; // Keep the existing image URL
        if (req.file) {
            imageUrl = getFileUrl(req, req.file.filename); // Update with the new image URL
        }

        // Prepare the updated data
        const updatedData = {
            ...req.body,
            image: imageUrl, // Ensure the image field is updated
        };

        // Update the category
        const updatedCategory = await categoryService.updateCategory(categoryId, updatedData);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category', error });
    }
};
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    if (isNaN(Number(categoryId))) {
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    try {
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        if (!deletedCategory) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.log('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category', error });
    }
}