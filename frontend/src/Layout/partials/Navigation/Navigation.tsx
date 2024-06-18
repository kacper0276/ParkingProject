import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const buttonMobile = useRef<HTMLDivElement>(null);
  const navigationList = useRef<HTMLUListElement>(null);

  const showMenu = () => {
    if (buttonMobile.current && navigationList.current) {
      buttonMobile.current.classList.toggle(`${styles.active}`);
      navigationList.current.classList.toggle(`${styles.active}`);
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
            Strona główna
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link
            to={"/paneluzytkownika"}
            className={`${styles.navigation_link}`}
          >
            Twój panel
          </Link>
        </li>
      </ul>
    </nav>
  );
}
