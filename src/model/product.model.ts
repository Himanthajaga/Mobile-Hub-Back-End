import mongoose, { Schema } from "mongoose";
const ProductModel = new mongoose.Schema(
    {
        "id": {
            // NO Sql(Mongo Db)require = true, sql not null
            required: true,//like not null
            // type: String, // No Sql(Mongo Db) type is not String, sql varchar
            type: String,
            unique: true,//unique key constraint
            index: true//for better performance
        },
        "name": {
            required: true,
            type: String,
        },
        "price": {
            required: true,
            type: Number
        },
        "currency": {
            required: true,
            type: String
        },
        "image": {
            required: true,
            type: String
        },
        "description": {
            type: String

        },
        "category": {
            type: Schema.Types.ObjectId, // Reference to the Category model
            ref: "Category", // Name of the Category model
            required: true,
        }
    }
);
const Product = mongoose.model('Product',ProductModel);
export default Product;