import { Application } from "express";
import parkingTicketRoutes from "./parkingTicket.routes";
import barrierRoutes from "./barrier.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/tickets", parkingTicketRoutes);
    app.use("/api/barrier", barrierRoutes);
  }
}
