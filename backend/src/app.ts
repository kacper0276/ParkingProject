import express, { Application } from "express";
import cors from "cors";
import route from "./router/web";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Mount routes
app.use(route);

export default app;
