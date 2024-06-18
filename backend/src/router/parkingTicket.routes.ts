import { Router } from "express";
import ParkingTicketController from "../controllers/ParkingTicketController";

class ParkingTicketRoutes {
  router = Router();
  controller = new ParkingTicketController();

  constructor() {
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.getAllTickets);
  }
}

export default new ParkingTicketRoutes().router;
