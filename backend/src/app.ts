import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./router";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const allowedOrigins = ["http://localhost:5173"];

    const corsOptions: CorsOptions = {
      origin: allowedOrigins,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
