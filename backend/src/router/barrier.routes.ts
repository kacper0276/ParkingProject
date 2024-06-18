import { Router } from "express";
import BarrierController from "../controllers/BarrierController";

class BarrierRoutes {
  router = Router();
  barrierController = new BarrierController();

  constructor() {
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.get("/open", this.barrierController.openBarrier);
    this.router.get("/close", this.barrierController.closeBarrier);
  }
}

export default new BarrierRoutes();
