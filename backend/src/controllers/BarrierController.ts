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

  async closeBarrier(req: Request, res: Response) {
    return res.status(200).send({ message: "Zamknięto szlaban" });
  }

  emitOpenBarrier(req: Request, res: Response) {
    this.emit("openBarrier", req, res);
  }
}

export default new BarrierController();
