const express = require("express");
const {
  updateCustomerData,
  registerCustomer,
  loginCustomer,
} = require("../../Controllers/customerController");
const router = express.Router();

// login route
router.post("/login", loginCustomer);
//Register
router.post("/register", registerCustomer);
//Update Customer's data
router.put("/:id", updateCustomerData);

module.exports = router;
