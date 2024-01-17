import AddSale from "./AddSale";
import { Link } from "react-router-dom";
const NavBar = ({ fetchSales }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <AddSale fetchSales={fetchSales} />
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Sub Branch
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Setting
              </a>
              <ul className="dropdown-menu">
                <Link to="/" className="dropdown-item">
                  <li>Logout</li>
                </Link>
              </ul>
            </li>
          </ul>

          <button
            onClick={() => window.print()}
            type="button"
            className="btn btn-success m-2"
          >
            Print
          </button>
          <div data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Sale
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
