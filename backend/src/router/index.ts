import { Application } from "express";
import parkingTicketRoutes from "./parkingTicket.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/tickets", parkingTicketRoutes);
  }
}
