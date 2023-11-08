import React from "react";
import Layout from "../components/Layout/Layout";
import { GrContact } from "react-icons/gr";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Layout title={"Contact-epark"}>
      <div className="container2">
        <div className="row">
          <div className="col-md-6">
            <h2>
              <GrContact />
              Contact Us
            </h2>
            <img
              src="/images/contactus.jpeg"
              alt="img"
              style={{ width: "85%" }}
            />
          </div>
          <div className="col-md-6">
            <h2>Contact Information</h2>
            <address>
              <strong>Company Name</strong>
              <br />
              123 Main Street
              <br />
              City, State 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@example.com
            </address>
            <Link to="/" className="button-link">
              Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
