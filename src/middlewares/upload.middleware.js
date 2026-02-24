import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
        folder: "blog_uploads",
        resource_type: "image",
        format: file.mimetype.split("/")[1],
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        };
    },
});

export const upload = multer({
    storage
})