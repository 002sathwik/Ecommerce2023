import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import { RiContactsLine } from "react-icons/ri";

const ProfilePasswordreseet = () => {
  const [auth] = useAuth();
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
        navigate("/dashboard/user/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Forgot-Pawword"}>
      <div className="container-fluid m-2 p-3 bg -light">
        <div className="row ">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-6 "></div>
              <div className="container">
                <div className="row Mainnamecontainer m-1 p-2 align-items-center">
                  <div className="col-sm-2  m-2 p-1 text-center">
                    <RiContactsLine style={{ fontSize: "2rem" }} />
                  </div>
                  <div className="col-sm-2 text-center">
                    {" "}
                    Hey! {auth.user.name}
                  </div>
                </div>
                <div className="col ">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 ">
            {" "}
            <div className="Forgotfrom d-flex ">
              <div className="row ">
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

                    <button type="submit" className="btn rg btn-primary">
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePasswordreseet;
