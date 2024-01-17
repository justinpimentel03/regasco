const Sale = require("../models/sale.model");

const addSale = async (req, res) => {
  try {
    const { gasType, totalAvailable, kilos } = req.body;

    // Check if gasType and totalAvailable are valid
    if (!gasType || isNaN(totalAvailable)) {
      return res.status(400).json({
        message: "Invalid values for gasType or totalAvailable",
      });
    }

    // Calculate totalKg
    const totalKg = totalAvailable * kilos; // Assuming kilos is fixed at 5

    // Create a new Sale instance with totalKg
    const sale = new Sale({ gasType, totalAvailable, kilos: totalKg });

    // Save the sale to the database
    await sale.save();

    // Respond with success message and calculated totalKg
    res.status(201).json({ message: "Sale added successfully", totalKg });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errorMessages = Object.values(error.errors).map((err) => err.message);
      console.log("Validation Error: ", errorMessages);

      return res.status(400).json({ message: errorMessages.join(", ") });
    }

    console.error("Error ", error.message);
    res.status(500).json({ message: "Error adding sale" });
  }
};



const getSale = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findById(id);

    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Sale.findByIdAndDelete(id);

    if (result) {
      res.json({ message: "Sale item deleted successfully" });
    } else {
      res.status(404).json({ message: "Sale item not found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};

const decrementValues = async (req, res) => {
  const { id } = req.params;
  const { decrementTotalAvailable, decrementKilos } = req.body;

  try {
    // Check if decrementTotalAvailable and decrementKilos are non-empty
    if (!decrementTotalAvailable || !decrementKilos) {
      return res.status(400).json({
        message: "Both input fields are required and cannot be empty",
      });
    }

    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    if (isNaN(decrementTotalAvailable) || isNaN(decrementKilos)) {
      return res.status(400).json({
        message: "Invalid values for decrementTotalAvailable or decrementKilos",
      });
    }

    // Perform the decrement operation
    sale.totalAvailable -= Number(decrementTotalAvailable);
    sale.kilos -= Number(decrementKilos);


    await sale.save();
    res.json({ message: "Successfully Reported", sale });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Accessing custom error messages from the Mongoose model
      const errorMessages = Object.values(error.errors).map(
        (validationError) => validationError.message
      );
      console.log("Validation Error: ", errorMessages);

      return res.status(400).json({ errors: errorMessages });
    }

    console.error("Error: ", error);
    res.status(500).json({ message: "Error Reported" });
  }
};
module.exports = {
  addSale,
  getSale,
  getSaleById,
  deleteSale,
  decrementValues,
};
