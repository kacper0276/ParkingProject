import { Request, Response } from "express";
import IParkingTicket from "../models/parkingTicket";
import parkingTicketRepository from "../repository/parkingTicketRepository";
import barrierController from "./BarrierController";

export default class ParkingTicketController {
  max = 9;

  constructor() {
    this.showParkingLotOccupancy = this.showParkingLotOccupancy.bind(this);
    this.create = this.create.bind(this);
    setInterval(this.checkIfClientGetOutAfter15Minutes, 10 * 60 * 1000);
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
    } catch (err) {
      res.status(500).send({
        message: "Błąd",
      });
    }
  }

  async checkIfClientGetOutAfter15Minutes() {
    const resp =
      await parkingTicketRepository.getListPayedTicketsAndClientNotOut();

    resp.forEach((ticket) => {
      const now = new Date();
      const paymentDate = ticket.payment_date
        ? new Date(ticket.payment_date)
        : undefined;

      if (paymentDate) {
        const timeDiff = now.getTime() - paymentDate.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        if (minutesDiff > 15 && ticket.id) {
          paymentDate.setMinutes(paymentDate.getMinutes() + 15);

          parkingTicketRepository.startNewCounting(+ticket.id, paymentDate);
        }
      }
    });
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

  async openTheBarrierToLeave(req: Request, res: Response) {
    const ticketPayment = await parkingTicketRepository.getById(+req.params.id);

    if (ticketPayment?.payment_date != null) {
      // Sprawdzenie czy czas poniżej 15 minut TODO:
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
