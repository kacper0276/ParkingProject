import { RowDataPacket } from "mysql2";

export default interface IParkingTicket extends RowDataPacket {
  id?: number;
  registration_number?: string;
  date_of_entry?: Date;
  departure_date?: Date;
  paid?: boolean;
}
