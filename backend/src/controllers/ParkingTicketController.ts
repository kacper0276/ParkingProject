import { Request, Response } from "express";
import IParkingTicket from "../models/parkingTicket";
import parkingTicketRepository from "../repository/parkingTicketRepository";
import barrierController from "./BarrierController";

export default class ParkingTicketController {
  async create(req: Request, res: Response) {
    try {
      const ticket: IParkingTicket = req.body;
      const result = await parkingTicketRepository.createTicket(ticket);

      barrierController.emitOpenBarrier(req, res);
      // res.status(201).send(result);
    } catch (err) {
      console.log(err);

      res.status(500).send({
        message: "Błąd, nie można pobrać biletu",
      });
    }
  }

  async getAllTickets(req: Request, res: Response) {
    try {
      const tickets = await parkingTicketRepository.getAll();

      res.status(200).send(tickets);
    } catch (err) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }

  async getAllUnpayedTickets(req: Request, res: Response) {
    try {
      const tickets = await parkingTicketRepository.getListUnpayedTickets();

      res.status(200).send(tickets);
    } catch (error) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }

  async calculateHowMuchToPay(req: Request, res: Response) {
    const costForOneMinute = 1;
    const id = req.params.id;

    try {
      const timeEntry = await parkingTicketRepository.calculatePayments(+id);
      const timeNow = new Date();

      const diffInMilliseconds = timeNow.getTime() - timeEntry.getTime();
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

      const totalCost = diffInMinutes * costForOneMinute;

      res
        .status(200)
        .send({ timeEntry, timeNow, totalCost: `${totalCost} zł` });
    } catch (err) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }

  async openTheBarrierToLeave(req: Request, res: Response) {}

  async showParkingLotOccupancy(req: Request, res: Response) {
    const max = 20;
    try {
      const occupacy =
        await parkingTicketRepository.calculateOccupiedParkingSpaces();

      res.status(200).send({ actual: occupacy, max });
    } catch (error) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }
}
