import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div>
      <Layout>
        <div className="container-fluid m-3">
          <div className="row">
            <div className="col-md-3 adminmenu">
              <AdminMenu />
            </div>
            <div className=" col-md-6 m-3 admindetiles ">
              <div className="row">
                <div className="col-md-3 details">
                  <h1>Details</h1>
                </div>
                <div className="col-md-9">
                  <div className="card p-3">
                    <h3>Name: {auth.user.name}</h3>
                    <h3>Email: {auth.user.email}</h3>
                    <h3>Contact: {auth.user.phone}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
