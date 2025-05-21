const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

mongoose
  .connect(
    "mongodb+srv://harishparidala:9OA8hnLtGwni3dH6@cluster0.acda0ov.mongodb.net/"
  )
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: "http://localhost:5173/",
        methods: ['GET', 'POST','DELETE','PUT','PATCH'],
        allowedHeaders: ["Content-Type",'Authorization','Cache-Control', 'Expires','Pragma'],
        credentials: true
    })
)
app.use(cookieParser());
app.use(express.json());

app.listen(PORT,()=> console.log(`Server is running on the port ${PORT}`))