import { Request, Response } from 'express';
import * as productService from '../services/product.service';
export const getAllProducts = async (req:Request, res:Response) => {
//     ctrl+alt+T to wrap in try catch
    try{
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }catch(error) {
        console.log('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error });
    }
}
export const saveProduct =async (req:Request, res:Response) => {
    try {
        //request body eke ena data tika ganna puluwan mehema
        const product = req.body;
        const validationError = await productService.validateProduct(product);
        if (validationError) {
            res.status(400).json({message: validationError});
            return;
        }
        const savedProduct = await productService.saveProduct(product);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.log('Error saving product:', error);
        res.status(500).json({message: 'Error saving product', error});
        return
    }
}
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
export const updateProduct = async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)){
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const updatedData = req.body;
    const updatedProduct =await productService.updateProduct(productId,updatedData);
    if (!updatedProduct) {
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json(updatedProduct);
}
export const deleteProduct = async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) {
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const deletedProduct =await productService.deleteProduct(productId);
    if (!deletedProduct) {
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json({
        message: 'Product deleted successfully'
    })
}