const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const customerRoutes = require("./api/customerRoutes");
const productRoutes = require("./api/productRoutes");
// const ordersRoutes = require("./api/ordersRoutes");

router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
// router.use("/orders", ordersRoutes);

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
