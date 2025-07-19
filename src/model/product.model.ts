import mongoose from "mongoose";

const ProductModel = new mongoose.Schema(
    {
        "id": {
            // NO Sql(Mongo Db)require = true, sql not null
            required: true,//like not null
            // type: String, // No Sql(Mongo Db) type is not String, sql varchar
            type: Number,
            unique: true,//unique key constraint
            index: true//for better performance
        },
        "name": {
            required: true,
            type: String
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
        }
    }
);
const Product = mongoose.model('Product',ProductModel);
export default Product;