import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiContactsLine } from "react-icons/ri";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //get user data------------------------------------
  useEffect(() => {
    const { email, name, phone, address, password } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setPassword(password);
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error("issue");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went wrong");
    }
  };
  return (
    <Layout title={"Profile"}>
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
          <div className="col-md-8">
            <div className="row bg-light">
              <div className="container ">
                <div className="row">
                  <form  className="profileform">
                    <div className="row">
                      <div className="col">
                        {" "}
                        <h1 className="pi">Personal Information</h1>
                      </div>
                      <div className="col">
                        <div className="form-group button-container">
                          <button
                            type="submit"
                            className="btn mr-2 btn-outline-dark"
                            onClick={handleSubmit}
                          >
                            Update Profile
                          </button>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group button-container">
                          <button
                            type="submit"
                            className="btn mr-2 btn-outline-dark"
                            onClick={() => {
                              navigate("/profileset");
                            }}
                          >
                            ResetPassword
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="form-group m-3">
                      <label>Username</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id=""
                        placeholder="User Name"
                        style={{ width: "280px" }}
                        required
                      />
                    </div>

                    <div className="form-group m-3">
                      <label>User Phone</label>
                      <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        id=""
                        placeholder="Contact Number"
                        style={{ width: "280px" }}
                        required
                      />
                    </div>
                    <div className="form-group m-3">
                      <label>User Adress</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        id=""
                        placeholder="Address"
                        style={{ width: "380px", height: "100px" }}
                        required
                      />
                    </div>
                    <div className="row ">
                      <div className="col">
                        {" "}
                        <div className=" form-group m-3">
                          <label>User Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email"
                            style={{ width: "280px" }}
                            required
                            disabled
                          />{" "}
                        </div>
                      </div>
                    </div>
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

export default Profile;
