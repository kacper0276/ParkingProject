import { useParams } from "react-router-dom";
import styles from "./PaymentPage.module.css";
import axios from "axios";
import { API_URL } from "../../App";
import { useEffect, useState } from "react";

interface ICost {
  totalCost: string;
}

export default function PaymentPage() {
  const { id } = useParams();
  const [cost, setCost] = useState<ICost>({ totalCost: "0" });

  const fetchCostForTicket = async () => {
    axios.get(`${API_URL}/calculate-cost/${id}`).then((res) => {
      setCost(res.data);
    });
  };

  const payForTicket = async () => {
    axios.get(`${API_URL}/pay-for-ticket/${id}`).then((res) => {
      alert(res.data);
    });
  };

  useEffect(() => {
    fetchCostForTicket();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <p>Płatność biletu o numerze: {id}</p>
      <p>Kwota to: {cost.totalCost}</p>
      <button className={`${styles.paid_button}`} onClick={payForTicket}>
        Opłać bilet
      </button>
    </div>
  );
}
