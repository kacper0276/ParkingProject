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
    this.router.get(
      "/calculate-occupacy",
      this.controller.showParkingLotOccupancy
    );
    this.router.get("/unpayed-tickets", this.controller.getAllUnpayedTickets);
    this.router.get(
      "/calculate-cost/:id",
      this.controller.calculateHowMuchToPay
    );
  }
}

export default new ParkingTicketRoutes().router;
