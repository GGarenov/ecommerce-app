const express = require("express");
const mongooose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Create a database connection

mongooose
  .connect(
    "mongodb+srv://ggarenov:8vHHN5OlRPfsNys1@cluster0.jujmu.mongodb.net/"
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
