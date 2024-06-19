import IParkingTicket from "../models/parkingTicket";
import connection from "../helpers/databaseConnection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class ParkingTicketRepository {
  getAll(): Promise<IParkingTicket[]> {
    return new Promise((resolve, reject) => {
      connection.query<IParkingTicket[]>(
        "SELECT * FROM tickets",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  getById(id: number): Promise<IParkingTicket | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IParkingTicket[]>(
        "SELECT * FROM tickets WHERE id=?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  createTicket(tickedData: IParkingTicket): Promise<IParkingTicket> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO tickets (registration_number, date_of_entry, departure_date, payment_date) VALUES(?, ?, null, null)",
        [tickedData.registration_number, new Date()],
        (err, res) => {
          if (err) reject(err);
          else
            this.getById(res.insertId)
              .then((ticket) => resolve(ticket!))
              .catch(reject);
        }
      );
    });
  }

  calculateOccupiedParkingSpaces(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        "SELECT COUNT(*) as occupacy FROM tickets WHERE payment_date IS NULL",
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]?.occupacy || 0);
        }
      );
    });
  }

  getListUnpayedTickets(): Promise<IParkingTicket[]> {
    return new Promise((resolve, reject) => {
      connection.query<IParkingTicket[]>(
        "SELECT * FROM tickets WHERE payment_date IS NULL",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  getListPayedTicketsAndClientNotOut(): Promise<IParkingTicket[]> {
    return new Promise((resolve, reject) => {
      connection.query<IParkingTicket[]>(
        "SELECT * FROM tickets WHERE payment_date IS NOT NULL AND departure_date IS NULL",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  calculatePayments(id: number): Promise<Date> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        "SELECT date_of_entry FROM tickets WHERE id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]?.date_of_entry);
        }
      );
    });
  }

  payForParking(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        "UPDATE tickets SET payment_date=? WHERE id = ?",
        [new Date(), id],
        (err, res) => {
          if (err) reject(err);
          else resolve("Zapłacono za parking");
        }
      );
    });
  }

  setLeaveParkingTime(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        "UPDATE tickets SET departure_date=? WHERE id=?",
        [new Date(), id],
        (err, res) => {
          if (err) reject(err);
          else resolve("Ustawiono datę wyjazdu");
        }
      );
    });
  }
}

export default new ParkingTicketRepository();
