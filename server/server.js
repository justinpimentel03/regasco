const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error.bind(`MongoDb connection error: ${err}`);
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
});

// MiddleWare
app.use(bodyParser.json());
app.use(cors());

// Routes

const userRoutes = require("./routes/userRoutes");
const saleRoutes = require("./routes/saleRoutes");
app.use("/api", userRoutes);
app.use("/api", saleRoutes);

const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
