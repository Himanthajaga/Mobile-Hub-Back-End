import {Router} from "express";
import {deleteProduct, getAllProducts, getProduct, saveProduct, updateProduct} from "../controller/product.controller";
import {authorizeRoles} from "../middleware/auth.middleware";
import multer from "multer";
const productRouter:Router = Router();
// Handle Requests
const storage = multer.diskStorage({});
const upload = multer({ storage });
productRouter.get("/all", getAllProducts); // Get All
productRouter.post("/save", authorizeRoles('admin'),upload.single("image"), saveProduct); // Save
productRouter.get("/:id", getProduct);
productRouter.put("/update/:id", authorizeRoles('admin'), updateProduct);
productRouter.delete("/delete/:id", authorizeRoles('admin'), deleteProduct)
export default productRouter;