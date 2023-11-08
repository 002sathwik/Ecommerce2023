import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { RiContactsLine } from "react-icons/ri";
import moment from "moment";

import { useAuth } from "../../context/auth"; // Assuming this is the correct path to your auth context
import axios from "axios"; // Import axios without destructuring

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const divStyle = {
    boxShadow: "3px 3px 3pxlightgray", // Adjust the shadow properties as needed
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Profile-orders"}>
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
          <div className="col-md-8 ">
            <div className="row m-3">
              <div className="row bg-light">
                {" "}
                <h1>All Orders And Updates</h1>
              </div>
              <div className="row m-3">
                {orders?.map((o, i) => {
                  return (
                    <div className="border-shadow m-2" style={divStyle}>
                      <table class="table m-3 p-3">
                        <thead>
                          <tr className="">
                            <th scope="col">Index</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <td>
                                <button
                                  className="btn"
                                  style={{
                                    color:
                                      o?.status === "Not Processed"
                                        ? "black"
                                        : o?.status === "Delivered"
                                        ? "black"
                                        : o?.status === "Shipped"
                                        ? "black"
                                        : o?.status === "OutofDelivery"
                                        ? "black"
                                        : "black", // Default text color
                                    background:
                                      o?.status === "Not Processed"
                                        ? "yellow"
                                        : o?.status === "Delivered"
                                        ? "green"
                                        : o?.status === "Shipped"
                                        ? "orange"
                                        : o?.status === "OutofDelivery"
                                        ? "blue"
                                        : "transparent", // Default background color
                                    border: "none",
                                    cursor: "default",
                                    outline: "none",
                                  }}
                                  disabled={true}
                                >
                                  {o?.status}
                                </button>
                              </td>
                            </td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container p-3">
                        {o?.products?.map((p, i) => (
                          <div className="row m-1  card flex-row bg-light cartcard">
                            <div className="col-md-6 p-2 imagecontainer">
                              <div className="image-container">
                                {" "}
                                <img
                                  className="card-img-top"
                                  src={`/api/v1/product/get-photo/${p._id}`}
                                  alt={p.name}
                                  style={{
                                    width: "180px",
                                    height: "163px",
                                  }} // Adjust the width and height values as needed
                                />
                              </div>
                              <hr />
                            </div>{" "}
                            <div className="col-md-6">
                              <h3>Details</h3>
                              <hr />
                              <p>
                                {" "}
                                ({i + 1}) {p.name}
                              </p>
                              <p>{p.description}</p>
                              <p>Price:{p.price}/-</p>
                              <hr />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
