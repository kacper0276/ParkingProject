import { useParams } from "react-router-dom";
import styles from "./PaymentPage.module.css";

export default function PaymentPage() {
  const { id } = useParams();

  return <div className={`${styles.main_container}`}>Płatność: {id}</div>;
}
