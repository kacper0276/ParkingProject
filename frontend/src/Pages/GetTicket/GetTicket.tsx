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

  return (
    <div className={`${styles.main_container}`}>
      <h1>
        Ilość wolnych miejsc:{" "}
        {actualOccupacy ? actualOccupacy.max - actualOccupacy.actual : "-"}
      </h1>
      <strong>Pobierz bilet</strong>
      <button>Klik</button>
    </div>
  );
}
