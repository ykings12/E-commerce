import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Define multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

// Define file filter function
const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    // Check if file extension and mimetype match the allowed types
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Image only"), false);
    }
};

// Initialize multer with storage and fileFilter
const upload = multer({ storage, fileFilter });

// Define upload single image middleware
const uploadSingleImage = upload.single('image'); // Fix typo here

// Handle POST request to upload image
router.post("/", (req, res) => {
    // Call uploadSingleImage middleware to handle file upload
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`, // Fix typo here
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    });
});



export default router;
