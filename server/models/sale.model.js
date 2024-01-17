const mongoose = require("mongoose");

const saleSchema = mongoose.Schema(
  {
    gasType: {
      type: String,
      required: [true, "Gas type is required"],
    },

    totalAvailable: {
      type: String,
      required: [true, "Total available is required"],
    },
    kilos: {
      type: String,
      required: [true, "Kilos is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
