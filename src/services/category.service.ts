import { CategoryDto } from '../dto/category.dto';
import Category from "../model/category.model";
import { v4 as uuidv4 } from 'uuid';
export const getAllCategories = async (): Promise<CategoryDto[]> => {
    Category.find();
}
export const saveCategory = async (category: { id:string,name:any,description:any,image:string}): Promise<CategoryDto> => {
    return Category.create(category);
}
export const getCategoryById = async (id: string): Promise<CategoryDto | null> => {
    return Category.findOne({ id: id });
}
export const updateCategory = async (id: string, data: CategoryDto): Promise<CategoryDto | null> => {
    const category = await Category.findOneAndUpdate({id:id},data,{new: true});
    if (!category) {
        return null; // Category not found
    }
    return category;
}
export const deleteCategory = async (id: string): Promise<boolean> => {
    await Category.deleteOne({ id: id });
    return true;
}
export const validateCategory = (category: CategoryDto): string | null => {
    if (!category.id || !category.name || !category.description || !category.image) {
        return 'All fields are required';
    }
    return null;
}
export const generateUniqueId = async (): Promise<string> => {
    let uniqueId: string;
    let isUnique = false;

    do {
        uniqueId = uuidv4(); // Generate a UUID
        const existingCategory = await Category.findOne({ id: uniqueId });
        if (!existingCategory) {
            isUnique = true;
        }
    } while (!isUnique);

    return uniqueId;
};