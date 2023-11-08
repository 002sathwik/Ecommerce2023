import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { RiContactsLine } from "react-icons/ri";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Profile"}>
      <div className="container-fluid m-2 p-3 bg -light">
        <div className=" row inro ">
          <div className="col-md-3">
            <div className=" row inro">
              <div className="col-md-6 "></div>
              <div className="container">
                <div className=" row inro Mainnamecontainer m-1 p-2 align-items-center">
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
          <div className="col-md-5 m-2 p-3 bg-light ">
            <div className="Conatiner-fluid">
            <div className="col">
              <h1 className="userinfo">UserInformation</h1>
              <hr/>
            </div>
              <div className=" row inro ">UserName: {auth.user.name} </div>
              <div className=" row inro">UserEmail: {auth.user.email}</div>
              <div className=" row inro"> UserContact: {auth.user.phone}</div>
              <div className=" row inro">UserAddress: {auth.user.address}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
