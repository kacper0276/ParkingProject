import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const buttonMobile = useRef<HTMLDivElement>(null);
  const navigationList = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const showMenu = () => {
    if (buttonMobile.current && navigationList.current) {
      buttonMobile.current.classList.toggle(`${styles.active}`);
      navigationList.current.classList.toggle(`${styles.active}`);
    }
  };

  const handleClick = () => {
    const userInput = prompt("Zczytaj numer biletu");

    if (userInput !== null) {
      navigate(`/platnosc/${userInput}`);
    }
  };

  const handleClickToOpenBarrier = () => {
    const userInput = prompt("Zczytaj numer biletu");

    if (userInput !== null) {
      navigate(`/otworz-szlaban/${userInput}`);
    }
  };

  return (
    <nav className={`${styles.navigation}`}>
      <div
        className={`${styles.button_mobile}`}
        ref={buttonMobile}
        onClick={showMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.navigation_list}`} ref={navigationList}>
        <li className={`${styles.navigation_element}`}>
          <Link to="/" className={`${styles.navigation_link}`}>
            Pobierz bilet
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link to={"/panel-admina"} className={`${styles.navigation_link}`}>
            Panel administratora
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <button className={`${styles.navigation_link}`} onClick={handleClick}>
            Płatność za bilet
          </button>
        </li>
        <li className={`${styles.navigation_element}`}>
          <button
            className={`${styles.navigation_link}`}
            onClick={handleClickToOpenBarrier}
          >
            Otwórz szlaban
          </button>
        </li>
      </ul>
    </nav>
  );
}
