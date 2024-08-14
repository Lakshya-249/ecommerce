import express from "express";
import { loadEnvFile } from "process";
import mongoose from "mongoose";
import router from "./router";
import cors from "cors";
loadEnvFile();

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 3020;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
