import { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import axios from "axios";
import { API_URL } from "../../App";
import cutTime from "../../helpers/cutTime";
import ITicket from "../../types/tickets.type";
import IOccupacyData from "../../types/occupacy.type";

export default function AdminPanel() {
  const [activeTickets, setActiveTickets] = useState<ITicket[]>([]);
  const [allTickets, setAllTickets] = useState<ITicket[]>([]);
  const [actualOccupacy, setActualOccupacy] = useState<
    IOccupacyData | undefined
  >();

  const fetchActiveTickets = async () => {
    axios.get(`${API_URL}/unpayed-tickets`).then((res) => {
      setActiveTickets(res.data);
    });
  };

  const fetchAllTickets = async () => {
    axios.get(`${API_URL}`).then((res) => {
      setAllTickets(res.data);
    });
  };

  const fetchActualOccupacy = async () => {
    try {
      const response = await axios.get(`${API_URL}/calculate-occupacy`);

      setActualOccupacy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActiveTickets();
    fetchAllTickets();
    fetchActualOccupacy();
  }, []);

  const freeSeats = actualOccupacy
    ? actualOccupacy.max - actualOccupacy.actual
    : "-";

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.container}`}>
        <p>
          Ilość wolnych miejsc: {freeSeats} na {actualOccupacy?.max}
        </p>
        <table className={`${styles.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rejestracja</th>
              <th>Data wjazdu</th>
              <th>Data wyjazdu</th>
              <th>Data płatności</th>
            </tr>
          </thead>
          <tbody>
            {activeTickets.map((ticket, key) => {
              return (
                <tr key={key}>
                  <td>{ticket.id}</td>
                  <td>
                    {ticket.registration_number != null
                      ? ticket.registration_number
                      : "Nie podano"}
                  </td>
                  <td>{cutTime(ticket.date_of_entry)}</td>
                  <td>
                    {ticket.departure_date != null
                      ? cutTime(ticket.departure_date)
                      : "Brak"}
                  </td>
                  <td>
                    {ticket.payment_date != null
                      ? cutTime(ticket.payment_date)
                      : "Brak"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`${styles.container}`}>
        <p>Wszystkie bilety</p>
        <table className={`${styles.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rejestracja</th>
              <th>Data wjazdu</th>
              <th>Data wyjazdu</th>
              <th>Data płatności</th>
            </tr>
          </thead>
          <tbody>
            {allTickets.map((ticket, key) => {
              return (
                <tr key={key}>
                  <td>{ticket.id}</td>
                  <td>
                    {ticket.registration_number != null
                      ? ticket.registration_number
                      : "Brak"}
                  </td>
                  <td>{cutTime(ticket.date_of_entry)}</td>
                  <td>
                    {ticket.departure_date != null
                      ? cutTime(ticket.departure_date)
                      : "Brak"}
                  </td>
                  <td>
                    {ticket.payment_date != null
                      ? cutTime(ticket.payment_date)
                      : "Brak"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
