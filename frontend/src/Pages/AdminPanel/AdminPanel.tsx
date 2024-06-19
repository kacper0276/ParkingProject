import { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import axios from "axios";
import { API_URL } from "../../App";
import cutTime from "../../helpers/cutTime";

interface Tickets {
  id: number;
  registration_number?: string;
  date_of_entry: Date;
  departure_date?: Date;
  payment_date?: Date;
}

export default function AdminPanel() {
  const [activeTickets, setActiveTickets] = useState<Tickets[]>([]);

  const fetchActiveTickets = async () => {
    axios.get(`${API_URL}//unpayed-tickets`).then((res) => {
      setActiveTickets(res.data);
    });
  };

  useEffect(() => {
    fetchActiveTickets();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <p>Listy</p>
      <table>
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
      <p>Inne</p>
    </div>
  );
}
