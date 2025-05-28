const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/AuthRoutes");
require("dotenv").config();
const dbUrl = process.env.DB_URL;
const app = express();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(dbUrl, 
    {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, 
}
)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));

mongoose
  .connect(dbUrl, 
    {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}
)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.log("❌ MongoDB connection error:", error.message));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`🚀Server is running on the port ${PORT}`));
