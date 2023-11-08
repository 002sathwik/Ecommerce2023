import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Form function for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title={"SignIn"}>
      <div className="loginfrom d-flex justify-content-center align-items-center">
        <div className="row justify-content-center">
          <div className="col-4 imglogin">
            <img src="/images/girl.svg" alt="img" style={{ width: "100%" }} />
          </div>
          <div className="col-4">
            <form onSubmit={handleSubmit}>
              <h1 className="regHeading">SIGN IN</h1>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1"></label>
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
                <label htmlFor="exampleInputPassword1"></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                />
              </div>
              <p>
                <div className="container">
                  <div className="row m-3">
                    {" "}
                    <button
                      type="submit"
                      className="btn  forgotpass  btn-warning"
                      onClick={() => {
                        navigate("/forgotpassword");
                      }}
                    >
                      ForgotPassword
                    </button>
                  </div>
                  <div className="row">
                    <button type="submit" className="btn rg btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
