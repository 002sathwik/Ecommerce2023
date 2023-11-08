import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      {" "}
      <div className="text-center ">
        <div className="list-group">
          <h1 className="adminname">ADMIN PANEL</h1>
          <NavLink
            to="/dashboard/admin/create-caterogy"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/manage-orders"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Manege Orders
          </NavLink>

          <NavLink
            to="/dashboard/admin/product"
            className="list-group-item list-group-item-action adminmenulist"
          >
            Products
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
