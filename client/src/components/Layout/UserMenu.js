import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center ">
        <div className="list-group m-1">
          <h1 className="adminname">DASHBOARD</h1>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Update Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
