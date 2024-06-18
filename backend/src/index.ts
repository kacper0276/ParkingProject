import express, { Application } from "express";
import Server from "./app";
require("dotenv").config();

const app: Application = express();
const server: Server = new Server(app);
const PORT = process.env.PORT ? process.env.PORT : 8080;

app.listen(PORT, () => {
  console.log(`Serwer słucha na porcie: ${PORT}`);
});
