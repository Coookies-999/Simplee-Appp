import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

const MongoURI = process.env.MONGO;

mongoose
  .connect(MongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import userRoutes from "./routes/user.route.js";

app.use("/user", userRoutes);


app.use('/',(req,res)=>{
  res.setHeader
})

//trying upload using this and got uploaded
// app.post("/upload", upload.single("profile"), (req, res) => {
//   if (!req.file) return res.status(300).send("no file choosen");
//   console.log(req.body);
//   console.log(req.file);
//   return res.status(200).json({
//     file: req.file,
//   });
// });
