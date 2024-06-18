import IParkingTicket from "../models/parkingTicket";
import connection from "../helpers/databaseConnection";
import { ResultSetHeader } from "mysql2";

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
        "INSERT INTO tickets (registration_number, date_of_entry, departure_date, paid) VALUES(?, ?, null, false)",
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
}

export default new ParkingTicketRepository();
