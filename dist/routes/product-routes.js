"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const productRouter = (0, express_1.Router)();
// Handle Requests
productRouter.get("/all", product_controller_1.getAllProducts); // Get All
productRouter.post("/save", (0, auth_middleware_1.authorizeRoles)('admin'), product_controller_1.saveProduct); // Save
productRouter.get("/:id", product_controller_1.getProduct);
productRouter.put("/update/:id", (0, auth_middleware_1.authorizeRoles)('admin'), product_controller_1.updateProduct);
productRouter.delete("/delete/:id", (0, auth_middleware_1.authorizeRoles)('admin'), product_controller_1.deleteProduct);
exports.default = productRouter;
