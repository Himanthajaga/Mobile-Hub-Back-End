import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getAllProducts = async (req:Request, res:Response) => {
//     ctrl+alt+T to wrap in try catch
    try{
        const products = await productService.getAllProducts();
        console.log("Retrieved products:", products);
        res.status(200).json(products);
    }catch(error) {
        console.log('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error });
    }
}
export const saveProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, currency, description, category, image } = req.body;

        // Validate required fields
        if (!name || !price || !currency || !description || !category || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Generate a unique ID for the product
        const id = await productService.generateUniqueId();

        // Create the product object
        const product = { id, name, price, currency, description, category, image };

        // Save the product to the database
        const savedProduct = await productService.saveProduct(product);

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
export const getProduct =async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)){
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const product = await productService.getProductById(productId);
    if (!product){
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json(product);

}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        console.log("Request received at updateProduct endpoint");
        console.log("Update product request body:", req.body);

        const { id, ...updateData } = req.body;

        // Validate the product ID format (e.g., PROD<number>)
        if (!/^PROD\d+$/.test(id)) {
            return res.status(400).json({ error: "Invalid product ID format." });
        }

        // Call the service to update the product
        const updatedProduct = await productService.updateProduct(id, updateData);

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        res.status(400).json({ error: "Product ID is required" });
        return;
    }

    try {
        const deletedProduct = await productService.deleteProduct(productId);
        if (!deletedProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error });
    }
};