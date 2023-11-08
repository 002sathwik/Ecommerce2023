import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div>
       <Layout title={"Privacy@policy-epark"}>
        <div className="container2">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/privacy.jpg"
                alt="img"
                style={{ width: "90%" }}
              />
            </div>
            <div className="col-md-6">
              <div className="aboutp">
                <h2>Privacy Policy</h2>
                <p>
                  At [Company Name], we take your privacy seriously. This
                  Privacy Policy outlines how we collect, use, and protect your
                  personal information. We are committed to maintaining the
                  confidentiality and security of your data.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  - Personal information such as your name, email address, and
                  phone number may be collected when you interact with our
                  website or services. - We may collect non-personal
                  information, such as browser type, IP address, and device
                  information for analytical purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="row">
            <div className="col-md-6 aboutp">
              <h2> Your Information</h2>
              <p>
                - We use your personal information to provide you with the
                services and information you request. - We may use non-personal
                information for analytical purposes to improve our website and
                services.
              </p>

              <h2>Sharing Your Information</h2>
              <p>
                - We do not sell, trade, or rent your personal information to
                third parties. - We may share your information with trusted
                service providers who assist us in providing our services.
              </p>
              <Link to="/" className="button-link">
                 Home
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="/images/policy1.png"
                alt="img"
                style={{ width: "90%" }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policy;
