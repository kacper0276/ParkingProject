import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container-fluid bg-light py-3">
      <div className="container d-flex justify-content-center align-items-center">
        <p className="m-0">
          &copy; Kacper Renkel &middot; <Link to="#">Regulamin</Link> &middot;{" "}
          <Link to="#">Kontakt</Link> <Link to="#">Polityka prywatności</Link>
        </p>
      </div>
    </footer>
  );
}
