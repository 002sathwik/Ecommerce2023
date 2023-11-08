import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { SiTrustedshops } from "react-icons/si";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import Searchform from "../form/Searchform";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";

const Header = () => {
  const [auth, setAuth] = useAuth();
  
  const [cart,] = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handellogout = () => {
    // Clearing local storage
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    alert("All The Cart Items  Will Be cleared")
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" href="#">
            <span className="e" style={{ color: "white" }}>
              <SiTrustedshops className="e" />
            </span>
            <span className="park" style={{ color: "white" }}>
              Park
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "white" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{ backgroundColor: "black" }}
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Searchform />
              </li>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  style={{ color: "white" }}
                >
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item special-nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item special-nav">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown special-nav">
                    <div
                      className={`nav-link dropdown-toggle ${
                        dropdownOpen ? "show" : ""
                      }`}
                      role="button"
                      onClick={toggleDropdown}
                      style={{ color: "white" }}
                    >
                      {auth?.user?.name}
                    </div>
                    <div
                      className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                      style={{
                        backgroundColor: "black", // Background color
                        color: "white", // Text color
                      }}
                    >
                      <NavLink
                        className="dropdown-item"
                        to={
                          auth?.user?.role === 1
                            ? "/dashboard/admin"
                            : "/dashboard/user"
                        }
                        style={{ color: "white" }}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        onClick={handellogout}
                        to="/login"
                        className="dropdown-item"
                        style={{ color: "white" }}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </li>
                </>
              )}
              <li className="nav-item special">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <Badge count={cart?.length} offset={[10, 10]}>
                    <BsFillCartCheckFill
                      style={{ color: "white", fontSize: "35px", margin:"5px" }}
                    />
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
