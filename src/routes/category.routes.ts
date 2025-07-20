import { Router } from "express";
import { saveCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controller/category.controller";
import { upload } from "../middleware/image.middleware";
import { authorizeRoles } from "../middleware/auth.middleware";

const categoryRouter: Router = Router();

categoryRouter.get("/all", getAllCategories);
categoryRouter.post("/save", authorizeRoles("admin"), upload.single("image"), saveCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/update/:id", authorizeRoles("admin"), upload.single("image"), updateCategory);
categoryRouter.delete("/delete/:id", authorizeRoles("admin"), deleteCategory);

export default categoryRouter;