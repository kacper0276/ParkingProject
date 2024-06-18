import styles from "./GetTicket.module.css";

export default function GetTicket() {
  return (
    <div className={`${styles.main_container}`}>
      <h1>Ilość wolnych miejsc: </h1>
      <strong>Pobierz bilet</strong>
      <button>Klik</button>
    </div>
  );
}
