import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Import controllers and middlewares
import { 
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Route for adding a new product
router.route("/").get(fetchProducts)
                 .post(authenticate, authorizeAdmin, formidable(), addProduct);
// Route for fetching all products
router.route("/all").get(fetchAllProducts);

// Route for fetching top products
router.route("/top").get(fetchTopProducts);


 router.route("/new").get(fetchNewProducts);

// Route for fetching a product by ID
router.route("/:id").get(fetchProductById)
                    .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
                    .delete(authenticate, authorizeAdmin, formidable(), removeProduct);


// Route for adding a review to a product
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);


router.route('/filtered-products').post(filterProducts);

export default router;
