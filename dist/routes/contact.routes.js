"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controller/contact.controller");
const contactRouter = (0, express_1.Router)();
contactRouter.get("/all", contact_controller_1.getAllContacts); // Get all contacts
contactRouter.post("/save", contact_controller_1.saveContact); // Save contact (this should be a different controller method)
exports.default = contactRouter;
