import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Layout title={"About-epark"}>
        <div className="container2">
          <div className="row">
            <div className="col-md-6">
              <h2>About Us</h2>
              <img
                src="/images/about.jpeg"
                alt="img"
                style={{ width: "85%" }}
              />
            </div>
            <div className="col-md-6">
              <h2>Support@epark.com</h2>
              <div className="aboutp">
                <p>
                  Welcome to our website! At [Company Name], we are dedicated to
                  providing [brief description of your company or project]. We
                  strive to [mention your mission or purpose]. Our team is
                  passionate about [what your team is passionate about], and we
                  are committed to [your commitment or goals].
                </p>

                <h2>Our Team</h2>
                <p>
                  Our team consists of [number of team members] highly skilled
                  and experienced individuals. Each team member brings their
                  unique expertise to the table, allowing us to deliver [mention
                  what you can deliver] to our customers. We work
                  collaboratively to [mention how your team collaborates] and
                  ensure the success of our projects.
                </p>

                <h2>Why Choose Us?</h2>
                <p>
                  - [Highlight a key feature or advantage of your company] -
                  [Another feature or advantage] - [Additional feature or
                  advantage]
                </p>
                <Link to="/" className="button-link">
                 Home
              </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
