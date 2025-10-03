require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/main.js");
const errorHandler = require("./utils/errorHandler.js");

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// Routes
route(app);

// Error handler nên đặt cuối
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
