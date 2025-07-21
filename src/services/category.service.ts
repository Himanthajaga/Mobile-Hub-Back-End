import { CategoryDto } from '../dto/category.dto';
import Category from "../model/category.model";
import { v4 as uuidv4 } from 'uuid';

export const getAllCategories = async (): Promise<CategoryDto[]> => {
    const categories = await Category.find().lean();
    return categories.map(category => ({
        id: category.id || '',
        name: category.name,
        description: category.description,
        image: category.image,
    }));
};

export const saveCategory = async (category: { id: string; name: string; description: string; image: string }): Promise<CategoryDto> => {
    const savedCategory = await Category.create(category);
    return {
        id: savedCategory.id || '',
        name: savedCategory.name,
        description: savedCategory.description,
        image: savedCategory.image ||'',
    };
};

export const getCategoryById = async (id: string): Promise<CategoryDto | null> => {
    const category = await Category.findOne({ id }).lean();
    if (!category) return null;
    return {
        id: category.id || '',
        name: category.name,
        description: category.description,
        image: category.image,
    };
};

export const updateCategory = async (id: string, data: CategoryDto): Promise<CategoryDto | null> => {
    const updatedCategory = await Category.findOneAndUpdate({ id }, data, { new: true }).lean();
    if (!updatedCategory) return null;
    return {
        id: updatedCategory.id || '',
        name: updatedCategory.name,
        description: updatedCategory.description,
        image: updatedCategory.image,
    };
};

export const deleteCategory = async (id: string): Promise<boolean> => {
    try {
        const result = await Category.deleteOne({ id });
        return result.deletedCount > 0; // Return true if a category was deleted
    } catch (error) {
        console.error("Error in deleteCategory service:", error);
        throw error; // Rethrow the error for the controller to handle
    }
};

export const validateCategory = (category: CategoryDto): string | null => {
    if (!category.id || !category.name || !category.description || !category.image) {
        return 'All fields are required';
    }
    return null;
};

export const generateUniqueId = async (): Promise<string> => {
    let uniqueId: string;
    let isUnique = false;

    do {
        uniqueId = uuidv4();
        const existingCategory = await Category.findOne({ id: uniqueId });
        if (!existingCategory) {
            isUnique = true;
        }
    } while (!isUnique);

    return uniqueId;
};