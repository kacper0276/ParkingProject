export default interface ITicket {
  id: number;
  registration_number?: string;
  date_of_entry: Date;
  departure_date?: Date;
  payment_date?: Date;
}
