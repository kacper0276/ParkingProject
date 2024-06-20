import EventEmitter from "events";
import { Request, Response } from "express";

class BarrierController extends EventEmitter {
  constructor() {
    super();
  }

  openBarrier(req?: Request, res?: Response) {
    if (res) {
      return res.status(200).send({ message: "Otwarto szlaban" });
    } else {
      console.log("Otwarto szlaban (event triggered)");
    }
  }

  async closeBarrier(req: Request, res?: Response) {
    if (res) {
      return res.status(200).send({ message: "Zamknięto szlaban" });
    } else {
      console.log("Zamknięto szlaban (event triggered)");
    }
  }

  emitOpenBarrier(req?: Request, res?: Response) {
    this.emit("openBarrier", req, res);
  }

  emitCloseBarrier() {
    this.emit("closeBarrier");
  }
}

export default new BarrierController();
