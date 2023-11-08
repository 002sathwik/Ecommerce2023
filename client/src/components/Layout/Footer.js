import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="fot text-center text-lg-start text-muted">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left */}
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Left */}
        {/* Right */}
        <div>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </NavLink>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </NavLink>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </NavLink>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </NavLink>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </NavLink>
          <NavLink to="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </NavLink>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}
      {/* Section: Links  */}
      <section className="footer">
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
                Epark, "Your one-stop destination for a world of products, where
                convenience meets quality."
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 ">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-2">Product</h6>
              <hr />
              <NavLink className="text-reset">
                NodeJs
              </NavLink>
              <hr />
              <NavLink  className="text-reset">
                React
              </NavLink>
              <hr />
              <NavLink  className="text-reset">
                MongoDB
              </NavLink>
              <hr />
            </div>
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 vertical-stack">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-2">Useful links</h6>
              <hr />
              <Link to="/about" className="text-reset">
                About
              </Link>
              <hr />
              <Link to="/contact" className="text-reset">
                Contact
              </Link>
              <hr />
              <Link to="/policy" className="text-reset">
                Privacy Policy
              </Link>
              <hr />
            </div>

            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> INDIA, UDUPI, -547101
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                support@epark.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +9847512454
              </p>
              <p>
                <i className="fas fa-print me-3"></i> +9847751454
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}
      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;
