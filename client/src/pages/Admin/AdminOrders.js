import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import moment from "moment";

import { useAuth } from "../../context/auth"; // Assuming this is the correct path to your auth context
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
 
  
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  //eslint-disable-next-line
  const [orders, setOrders] = useState([]);
  //eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "OutofDelivery",
    "Delivered",
    "Canceled",
  ]);
  //eslint-disable-next-line
  const [changestatus, setChangeStatus] = useState("");
  //eslint-disable-next-line
  const divStyle = {
    boxShadow: "3px 3px 3pxlightgray", // Adjust the shadow properties as needed
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/manage-orders");
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
  //handel  asd manage status-------------------------
  const handelStatus = async (orderId, value) => {
    try {
      //eslint-disable-next-line
      const { data } = await axios.put(
        `/api/v1/auth/manage-status/${orderId}`,
        { status: value }
      );
      getOrders();
      toast.success("Status updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Profile-orders"}>
      <div className="container-fluid m-2 p-3 bg -light">
        <div className="row ">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-6 "></div>
              <div className="container">
                <div className="row Mainnamecontainer m-1 p-2 align-items-center">
                  <div className="col-sm-2 text-center">
                    {" "}
                    Hey! {auth.user.name}
                  </div>
                </div>
                <div className="col ">
                  <AdminMenu />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row m-3">
              <div className="row bg-light">
                <h1>All Orders And Updates</h1>
              </div>
              <div className="row m-3">
                {orders?.map((o, i) => {
                  return (
                    <div
                      className="card text-center m-2"
                      style={{ border: "1px solid black" }}
                      key={i}
                    >
                      <div className="card-header">
                        <div className="row">
                          <div className="col-md-6">Order Details {i + 1}</div>
                          <div className="col-md-6 p-1">
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
                                    ? "rgb(29, 220, 29)"
                                    : o?.status === "Processing"
                                    ? "rgb(249, 249, 111)"
                                    : o?.status === "Shipped"
                                    ? "#f41067"
                                    : o?.status === "OutofDelivery"
                                    ? "#1cbeef"
                                    : "transparent", // Default background color
                                border: "1px solid black",
                              }}
                            >
                              <Select
                                bordered={false}
                                onChange={(value) => handelStatus(o._id, value)}
                                defaultValue={o?.status}
                              >
                                {status?.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <table class="table m-3 p-3">
                          <thead>
                            <tr className="">
                              <th scope="col">Index</th>
                              <th scope="col">OrderId</th>
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
                                {" "}
                                {o?._id.length > 6
                                  ? o?._id.substring(0, 6) + "..."
                                  : o?._id}
                              </td>
                              <td>{o?.buyer?.name}</td>
                              <td>{moment(o?.createAt).fromNow()}</td>
                              <td>
                                {o?.payment.success ? "Success" : "Failed"}
                              </td>
                              <td>{o?.products?.length}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="container">
                        <div className="row">
                          {o?.products?.map((p, i) => (
                            <div className="col-md-4" key={i}>
                              <div
                                className="card p-2 m-3"
                                style={{ width: "12rem", height: "17rem" }}
                              >
                                <img
                                  className="card-img-top ms-3"
                                  src={`/api/v1/product/get-photo/${p._id}`}
                                  alt={p.name}
                                  style={{
                                    width: "130px",
                                    height: "90px",
                                    display: "flex",
                                    justifyContent: "center",
                                  }} // Adjust the width and height values as needed
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{p.name}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item">
                                    {p.description}
                                  </li>
                                  <li className="list-group-item">
                                    ₹{p.price}/-
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="card-footer text-muted">
                      {moment(o?.createAt).fromNow()}
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

export default AdminOrders;
