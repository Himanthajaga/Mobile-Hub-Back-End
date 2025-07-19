"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.saveProduct = exports.getAllProducts = void 0;
const productService = __importStar(require("../services/product.service"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //     ctrl+alt+T to wrap in try catch
    try {
        const products = yield productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        console.log('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error });
    }
});
exports.getAllProducts = getAllProducts;
const saveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //request body eke ena data tika ganna puluwan mehema
        const product = req.body;
        const validationError = yield productService.validateProduct(product);
        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }
        const savedProduct = yield productService.saveProduct(product);
        res.status(201).json(savedProduct);
    }
    catch (error) {
        console.log('Error saving product:', error);
        res.status(500).json({ message: 'Error saving product', error });
        return;
    }
});
exports.saveProduct = saveProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const product = yield productService.getProductById(productId);
    if (!product) {
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json(product);
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const updatedData = req.body;
    const updatedProduct = yield productService.updateProduct(productId, updatedData);
    if (!updatedProduct) {
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json(updatedProduct);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        res.status(400).json({
            error: 'Invalid product ID'
        });
        return;
    }
    const deletedProduct = yield productService.deleteProduct(productId);
    if (!deletedProduct) {
        res.status(404).json({
            error: 'Product not found'
        });
        return;
    }
    res.status(200).json({
        message: 'Product deleted successfully'
    });
});
exports.deleteProduct = deleteProduct;
