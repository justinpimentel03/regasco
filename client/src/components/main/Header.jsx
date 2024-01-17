import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h4>Main Branch</h4>
          </a>
          <div>
            <button
              id="printPageButton"
              onClick={() => window.print()}
              type="button"
              className="btn btn-success m-2"
            >
              Print
            </button>
            <Link to="/">
              <button
                type="button"
                className="btn btn-warning"
                id="printPageButton"
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
