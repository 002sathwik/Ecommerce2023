import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setPasswordnew] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // Form function for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newpassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Forgot-Pawword"}>
      <div className="Forgotfrom d-flex justify-content-center align-items-center">
        <div className="row justify-content-center">
          <div className="col-4 imgforgot">
            <img src="/images/reset.avif" alt="img" style={{ width: "100%" }} />
          </div>
          <div className="col-4">
            <form onSubmit={handleSubmit}>
              <h1 className="regHeading">RESET PASSWORD</h1>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={newpassword}
                  onChange={(e) => setPasswordnew(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="NewPassword"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="What Is Your Birth Place"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn rg btn-primary"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
