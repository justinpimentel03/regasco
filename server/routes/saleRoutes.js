const express = require("express");

const router = express.Router();
const saleController = require("../controller/sale.controller");
router.post("/add", saleController.addSale);
router.get("/sales", saleController.getSale);
router.post("/sale/:id", saleController.getSaleById);
router.delete("/delete/:id", saleController.deleteSale);
router.post("/decrement/:id", saleController.decrementValues);

module.exports = router;
