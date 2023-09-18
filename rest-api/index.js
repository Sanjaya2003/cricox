const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const userroutes=require("./routes/users")
const authroutes=require("./routes/auth")
const postroutes=require("./routes/Post")
const multer=require("multer");
const path =require("path");

dotenv.config();

    const client =  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');

    app.use("/images", express.static(path.join(__dirname, "public/images")));

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    });
    
    const upload = multer({ storage });
    
    app.post("/api/upload", upload.single("file"), (req, res) => {
      try {
        return res.status(200).json("File uploaded successfully");
      } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
      }
    });

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userroutes);
app.use("/api/auth",authroutes);
app.use("/api/posts",postroutes);


// Start the server
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
