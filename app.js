require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const shoesRouter = require("./routes/shoes");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const adminAuthRouter = require("./routes/adminAuth");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authenticateUser = require("./middlewares/authenticateUser");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("SneakPeak API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth/admin", adminAuthRouter);
app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/cart", authenticateUser, cartRouter);
// app.use("/api/v1/order", authenticateUser, orderRouter);
app.use("/api/v1/order", orderRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listining on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
