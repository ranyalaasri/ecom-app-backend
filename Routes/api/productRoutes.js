const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../middleware/isAdmin");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductData,
  deleteProduct,
} = require("../../controllers/productController");
const upload = require("../../middleware/multerMiddleware");

// const upload = require("../../middleware/multerMiddleware");

//create new product
// router.post("/", isAdmin, upload.single("productImage"), createProduct);
router.post("/", createProduct);
// router.post("/", createProduct);
//get all products list
router.get("/", getAllProducts);
//get product by id
router.get("/:id", getProductById);
//update product data
router.patch("/:id", isAdmin, updateProductData);
//delete product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
