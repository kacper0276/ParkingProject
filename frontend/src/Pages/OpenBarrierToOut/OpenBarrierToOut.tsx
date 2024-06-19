import { useParams } from "react-router-dom";
import styles from "./OpenBarrierToOut.module.css";
import axios from "axios";
import { API_URL } from "../../App";

export default function OpenBarrierToOut() {
  const { id } = useParams();

  const openBarrier = async () => {
    try {
      await axios.get(`${API_URL}/open-barrier/${id}`).then((res) => {
        alert(res.data.message);
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("An unexpected error occurred");
        }
      } else {
        console.log(error);
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className={`${styles.main_container}`}>
      <p>Otwórz szlaban</p>
      <button className={`${styles.open_button}`} onClick={openBarrier}>
        Otwórz
      </button>
    </div>
  );
}
