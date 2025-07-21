import * as categoryService from '../services/category.service';
import { Request, Response } from 'express';

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
        const { name, description, image } = req.body;

        // Validate required fields
        if (!name || !description || !image) {
            return res.status(400).json({ error: "Name, description, and image URL are required" });
        }

        // Generate a unique ID for the category
        const id = await categoryService.generateUniqueId();

        // Create the category object
        const category = { id, name, description, image };

        // Save the category to the database
        const savedCategory = await categoryService.saveCategory(category);

        // Respond with the saved category
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
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
    try {
        const { id, name, description, image } = req.body;

        if (!id || !name || !description) {
            return res.status(400).json({ error: "ID, name, and description are required" });
        }

        // Prepare updated data
        const updatedData: any = { name, description };
        if (image) {
            updatedData.image = image; // Use the provided image URL or file
        }

        // Update the category in the database
        const updatedCategory = await categoryService.updateCategory(id, updatedData);

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    if (!categoryId) {
        res.status(400).json({ error: "Category ID is required" });
        return;
    }

    try {
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        if (!deletedCategory) {
            res.status(404).json({ error: "Category not found" });
            return;
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category", error });
    }
};