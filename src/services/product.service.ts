import { ProductDto } from '../dto/product.dto';
import Product from "../model/product.model";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
import Category from "../model/category.model";

export const getAllProducts = async () => {
    try {
        const products = await Product.find({ id: { $regex: /^PROD/, $options: "i" } })
            .populate("category", "name")
            .lean();

        return products.map(product => ({
            id: product.id || '',
            name: product.name || '',
            price: product.price || 0,
            currency: product.currency || '',
            image: product.image || '',
            description: product.description || '',
            category: (product.category as any)?.name || 'Unknown Category',
        }));
    } catch (error) {
        console.error("Error retrieving products:", error);
        throw error;
    }
};
export const saveProduct = async (product: { id: string; name: string; price: number; currency: string; description: string; image: string; category: string }) => {
    try {
        console.log("Saving product:", product);
        // Check if the category is a valid ObjectId
        const category = mongoose.isValidObjectId(product.category)
            ? await Category.findById(product.category).lean()
            : await Category.findOne({ name: product.category }).lean();

        if (!category) {
            throw new Error(`Category "${product.category}" not found`);
        }

        // Replace the category with its ObjectId
        const savedProduct = await Product.create({
            ...product,
            category: category._id,
        });

        return savedProduct;
    } catch (error) {
        console.error("Error saving product:", error);
        throw error;
    }
};

export const getProductById = async (id: number): Promise<ProductDto | null> => {
    const product = await Product.findOne({ id })
        .populate("category", "name") // Populate category name
        .lean();
    if (!product) return null;
    return {
        id: product.id || '',
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        description: product.description || '',
        category: (product.category as any)?.name || '', // Map category name
    };
};
export const updateProduct = async (productId: string, productData: Partial<ProductDto>) => {
    try {
        // Resolve the category to its ObjectId
        const category = mongoose.isValidObjectId(productData.category)
            ? productData.category // If it's already an ObjectId, use it
            : await Category.findOne({ name: productData.category }).lean();

        if (!category || typeof category === "string") {
            throw new Error(`Category "${productData.category}" not found or invalid`);
        }

        // Update the product using the custom `id` field
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId }, // Query by the custom `id` field
            { ...productData, category: category._id },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            throw new Error(`Product with id "${productId}" not found`);
        }

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
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
export const deleteAllProducts = async (): Promise<void> => {
    try {
        const result = await Product.deleteMany({});
        console.log(`Deleted ${result.deletedCount} products from the database.`);
    } catch (error) {
        console.error("Error deleting all products:", error);
        throw error;
    }
}