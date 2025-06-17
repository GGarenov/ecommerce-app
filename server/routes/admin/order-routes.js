const express = require("express");

const {
  getAllOrders,
  getOrderDetailsForAdmin,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailsForAdmin);

module.exports = router;
