import { ProductDto } from '../dto/product.dto';
import Product from "../model/product.model";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";

export const getAllProducts = async (): Promise<ProductDto[]> => {
    const products = await Product.find().lean();
    return products.map(product => ({
        id: product.id || '', // Ensure id is a string
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        description: product.description || '', // Ensure description is a string
        category: product.category || '', // Ensure category is a string
    }));
};

export const saveProduct = async (product: { id: string; name: string; price: number; currency: string; description: string; image: string; category: string }): Promise<ProductDto> => {
    const savedProduct = await Product.create(product);
    return {
        id: savedProduct.id || '', // Ensure id is a string
        name: savedProduct.name,
        price: savedProduct.price,
        currency: savedProduct.currency,
        image: savedProduct.image || '', // Ensure image is a string
        description: savedProduct.description || '', // Ensure description is a string
        category: savedProduct.category || '', // Ensure category is a string
    };
};

export const getProductById = async (id: number): Promise<ProductDto | null> => {
    const product = await Product.findOne({ id }).lean();
    if (!product) return null;
    return {
        id: product.id || '', // Ensure id is a string
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        description: product.description || '', // Ensure description is a string
        category: product.category || '', // Ensure category is a string
    };
};
export const updateProduct = async (
    id: string,
    data: Omit<any, "id">
): Promise<ProductDto | null> => {
    try {
        // Ensure the ID is in the correct format
        if (!/^PROD\d+$/.test(id)) {
            throw new Error("Invalid product ID format.");
        }

        // Update the product in the database
        const updatedProduct = await Product.findOneAndUpdate(
            { id }, // Match the product by the `id` field
            data,
            { new: true } // Return the updated document
        ).lean();

        if (!updatedProduct) return null;

        // Map the updated product to the DTO
        return {
            id: updatedProduct.id || '', // Ensure id is a string
            name: updatedProduct.name,
            price: updatedProduct.price,
            currency: updatedProduct.currency,
            image: updatedProduct.image || "",
            description: updatedProduct.description || "",
            category: updatedProduct.category || "",
        };
    } catch (error) {
        console.error("Error in updateProduct service:", error);
        throw error;
    }
};
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        const result = await Product.deleteOne({ id });
        return result.deletedCount > 0; // Return true if a product was deleted
    } catch (error) {
        console.error("Error in deleteProduct service:", error);
        throw error; // Rethrow the error for the controller to handle
    }
};

export const validateProduct = (product: ProductDto): string | null => {
    if (!product.id || !product.name || !product.price || !product.currency || !product.image || !product.description) {
        return 'All fields are required';
    }
    return null;
};

export const generateUniqueId = async (): Promise<string> => {
    // Find the product with the highest numeric ID
    const lastProduct = await Product.findOne({})
        .sort({ id: -1 }) // Sort by ID in descending order
        .lean();

    let lastIdNumber = 0;

    if (lastProduct) {
        // Check if the ID is numeric or starts with "PROD"
        const numericPart = lastProduct.id.startsWith("PROD")
            ? lastProduct.id.replace("PROD", "")
            : lastProduct.id;

        // Parse the numeric part safely
        lastIdNumber = parseInt(numericPart, 10) || 0;
    }

    // Increment the numeric part to generate the new ID
    const newIdNumber = lastIdNumber + 1;

    // Format the new ID as "PROD<number>"
    const uniqueId = `PROD${newIdNumber}`;

    return uniqueId;
};