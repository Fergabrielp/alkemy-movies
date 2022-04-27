import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-danger fw-bold" to="/">
            Alkemy | Movies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/listado">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/favoritos">
                  FAVOURITES
                </Link>
              </li>
            </ul>
          </div>
          <Buscador />
        </div>
      </nav>
    </header>
  );
};

export default Header;
