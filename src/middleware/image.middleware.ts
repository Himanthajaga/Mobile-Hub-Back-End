import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

const uploadFolder = path.join(__dirname, "../../uploads");

// Ensure the upload folder exists
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

export const upload = multer({ storage });

// Helper function to generate the file URL
export const getFileUrl = (req: Request, filename: string): string => {
    const host = req.protocol + "://" + req.get("host");
    return `${host}/uploads/${filename}`;
};