import axios from "axios";
import styles from "./GetTicket.module.css";
import { API_URL } from "../../App";
import { useEffect, useState } from "react";

interface OccupacyData {
  max: number;
  actual: number;
}

export default function GetTicket() {
  const [actualOccupacy, setActualOccupacy] = useState<
    OccupacyData | undefined
  >();

  const fetchActualOccupacy = async () => {
    try {
      const response = await axios.get(`${API_URL}/calculate-occupacy`);

      setActualOccupacy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActualOccupacy();
  }, []);

  const freeSeats = actualOccupacy
    ? actualOccupacy.max - actualOccupacy.actual
    : "-";

  return (
    <div className={`${styles.main_container}`}>
      <h1>Ilość wolnych miejsc: {freeSeats}</h1>
      <strong>Pobierz bilet</strong>
      <button
        className={`${styles.button}`}
        disabled={
          actualOccupacy
            ? actualOccupacy.max - actualOccupacy.actual <= 0
            : true
        }
      >
        Klik
      </button>
    </div>
  );
}
