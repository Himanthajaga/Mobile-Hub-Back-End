import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dfwzzxgja", // Replace with your Cloudinary cloud name
    api_key: "117186248654227", // Replace with your Cloudinary API key
    api_secret: "2OzMZPtBYuzIX7sSLhT_FJadKgI", // Replace with your Cloudinary API secret
});

export default cloudinary;