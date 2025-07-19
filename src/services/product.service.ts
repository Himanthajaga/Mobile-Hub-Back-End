import Product from "../model/product.model";
import {ProductDto} from "../dto/product.dto";
export const getAllProducts = async():Promise<ProductDto[]>=>{
    // Logic to get all products
    // return prodctList;
    return Product.find();
}
export const saveProduct = async (product:ProductDto):Promise<ProductDto> =>{
    // productList.push(product);
    // return product;
    return Product.create(product);
}
export const getProductById = async (id:number):Promise<ProductDto | null>=>{
    // Logic to get product by ID
    return Product.findOne({id:id});
}
export const updateProduct =async (id:number,data:ProductDto)=>{
    const product =await Product.findOneAndUpdate({id:id}, data, {new: true});
    if (!product) {
        return null; // Product not found
    }
    // Object.assign(product, data);
    return product;
}
export const deleteProduct =async(id:number)=>{
    // const index = Product.(product => product.id === id);
    // if (index === -1){
    //     return false;
    // }
    // productList.splice(index, 1);
    await Product.deleteOne({id:id});
    return true;
}
export const validateProduct= (product:ProductDto) =>{
    if (!product.id || !product.name || !product.price || !product.currency || !product.image) {
        return 'All fields are required';
    }
    return null;
}