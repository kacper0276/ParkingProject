import { Router } from "express";
import barrierController from "../controllers/BarrierController";

class BarrierRoutes {
  router = Router();

  constructor() {
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.get("/open", barrierController.openBarrier);
    this.router.get("/close", barrierController.closeBarrier);
  }
}

export default new BarrierRoutes().router;
