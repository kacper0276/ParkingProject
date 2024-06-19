import { Request, Response } from "express";
import IParkingTicket from "../models/parkingTicket";
import parkingTicketRepository from "../repository/parkingTicketRepository";
import barrierController from "./BarrierController";

export default class ParkingTicketController {
  max = 20;

  constructor() {
    this.showParkingLotOccupancy = this.showParkingLotOccupancy.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const ticket: IParkingTicket = req.body;
      const calculate =
        await parkingTicketRepository.calculateOccupiedParkingSpaces();

      if (calculate >= this.max) {
        res.status(500).send({ message: "Parking maksymalnie zajęty!" });
        return;
      }

      await parkingTicketRepository.createTicket(ticket);

      barrierController.emitOpenBarrier(req, res);
    } catch (err) {
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

      res.status(200).send({ totalCost: `${totalCost} zł` });

      setTimeout(() => this.checkIfPayment(+id), 15 * 60 * 1000);
    } catch (err) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }

  async payForParking(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const response = await parkingTicketRepository.payForParking(+id);

      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({
        message: "Nastąpił błąd",
      });
    }
  }

  async checkIfPayment(id: number) {
    try {
      console.log(`Completing payment for ticket with ID: ${id}`);
    } catch (error) {
      console.error("Error completing payment:", error);
    }
  }

  async openTheBarrierToLeave(req: Request, res: Response) {
    const ticketPayment = await parkingTicketRepository.getById(+req.params.id);

    if (ticketPayment?.payment_date != null) {
      await parkingTicketRepository.setLeaveParkingTime(+req.params.id);
      res.status(200).send({ message: "Otwarto szlaban" });
    } else {
      res.status(500).send({ message: "By wyjechać opłać bilet" });
    }
  }

  async showParkingLotOccupancy(req: Request, res: Response) {
    try {
      const occupacy =
        await parkingTicketRepository.calculateOccupiedParkingSpaces();

      res.status(200).send({ actual: occupacy, max: this.max });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: "Błąd",
      });
    }
  }
}
