import React from "react";
import Layout from "../components/Layout/Layout";

import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div>
        <Layout title={"404-epark"}>
        <div className="container1 text-center">
          <div className="row">
            <div className="col-md-12">
              <h1 className="four">404</h1>
              <p className="oops">Oops! Page Not Found </p>
              <Link to="/" className="button-link">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Pagenotfound;
