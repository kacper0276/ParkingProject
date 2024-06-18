import { Request, Response } from "express";

export default class BarrierController {
  async openBarrier(req: Request, res: Response) {
    return res.status(200).send({ message: "Otwarto szlaban" });
  }

  async closeBarrier(req: Request, res: Response) {
    return res.status(200).send({ message: "Zamknięto szlaban" });
  }
}
