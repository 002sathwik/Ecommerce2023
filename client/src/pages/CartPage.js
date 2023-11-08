import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const CartPage = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  //eslint-disable-next-line
  const navigate = useNavigate();
  //deleting item from cart---------------------------
  const removecartItem = (pid) => {
    try {
      let mycartt = [...cart];
      let index = mycartt.findIndex((item) => item._id === pid);
      mycartt.splice(index, 1);
      setCart(mycartt);
      localStorage.setItem("cart", JSON.stringify(mycartt)); //removing item frfom local storage
    } catch (error) {
      console.log(error);
    }
  };
  //price calculating

  const totalprice = () => {
    try {
      let total = 0;
      //eslint-disable-next-line
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });

      return total;
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };
  const calculateTax = (total) => {
    let taxRate = 0.03;
    const taxAmount = total * taxRate;
    return taxAmount;
  };
  const calculateDeliveryCharges = () => {
    // You can specify your delivery charges calculation here
    return 59; // Replace this with your actual delivery charges logic
  };

  const calculateTotalAmount = () => {
    try {
      const total = totalprice();
      const deliveryCharges = calculateDeliveryCharges();
      const taxAmount = calculateTax(total);
      const grandTotal = total + deliveryCharges + taxAmount;
      return { total, deliveryCharges, taxAmount, grandTotal };
    } catch (error) {
      // Handle the error here
      console.error(error);
      return {
        total: 0,
        deliveryCharges: 0,
        taxAmount: 0,
        grandTotal: 0,
      };
    }
  };

  //get payment Gateway Token
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      //eslint-disable-next-line
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");

      await axios.post("/api/v1/email/send", {
        to: auth?.user?.email, // Change this to your email sending route
        subject: "Payment Confirmation from Epark",
        message: `Payment Completed of ₹${calculateTotalAmount().grandTotal}.We appreciate your business and are thrilled to have you as a shopper with us. Your order will be processed and delivered to you as soon as possible.You can track the delivery progress in the "Order History" section of your dashboard. If you have any questions or need assistance, please don't hesitate to contact our customer support team.\n\nThank you for choosing us, and we look forward to serving you again in the future!`,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  // Function to decrease the quantity of a specific cart item
  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        // Ensure the quantity doesn't go below 1
        const newQuantity = Math.max(item.quantity - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  return (
    <Layout>
      <div className="container-fluid m-2 p-3">
        <div className="row">
          <h1 className="text-center bg-light p-2 mb-1 white ">
            {`Hello ${auth?.token && auth?.user?.name}`}{" "}
            <h3 className="text-center">
              {cart?.length > 0
                ? `You Have ${cart.length} in your Cart ${
                    auth?.token ? "" : "Please Login to CheckOut"
                  }`
                : "Your Cart is Empty"}
            </h3>
          </h1>
          <div className="col-md-7">
            <div className="row firstproductrow ">
              <div className="col-md-9  productrow">
                {cart?.map((p) => (
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
                      <div className="container">
                        <div className="row bg-light">
                          <div className="col">
                            <IoMdAddCircleOutline
                              size="2em"
                              onClick={() => handleIncrement(p._id)}
                            />
                          </div>
                          <div className="col">
                            {" "}
                            <div className="col quantity">
                              {p.quantity} {/* Display the quantity here */}
                            </div>
                          </div>
                          <div className="col">
                            <IoMdRemoveCircleOutline
                              size="2em"
                              onClick={() => handleDecrement(p._id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="col-md-6">
                      <h3>Details</h3>
                      <hr />
                      <p>{p.name}</p>
                      <p>{p.description}</p>
                      <p>Price:{p.price}/-</p>
                      <hr />
                      <p>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => removecartItem(p._id)}
                        >
                          Remove
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-button-container ">
                {auth.user ? (
                  cart.length > 0 ? (
                    <button
                      className="btn but"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary but"
                      onClick={() => navigate("/")}
                    >
                      Add Items
                    </button>
                  )
                ) : (
                  <button
                    className="btn btn-primary but"
                    onClick={() => navigate("/login")}
                  >
                    Login to Proceed
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5 ">
            <div className="card text-center">
              <div className="card-header pricedetilers">PRICE DETAILS</div>
              <div className="card-body">
                <p className="card-text prereu">
                  Price ({cart.length} item)
                  <span className="result float-end">
                    ₹{calculateTotalAmount().total}/-
                  </span>
                </p>
                <p className="card-text prereu">
                  TaxAmount
                  <span className="result float-end">
                    ₹{calculateTotalAmount().taxAmount}/-
                  </span>
                </p>
                <p className="card-text prereu">
                  Delivery Charges
                  <span className="result float-end">
                    ₹{calculateTotalAmount().deliveryCharges}/-
                  </span>
                </p>
                <hr
                  style={{
                    borderStyle: "dotted",

                    borderColor: "#000",
                  }}
                />

                <h5 className="card-title  total">
                  Total Amount
                  <span className="result float-end">
                    ₹{calculateTotalAmount().grandTotal}/-
                  </span>
                </h5>
              </div>
              <div className="card-footer text-muted">
                <div className="row">
                  {auth?.user?.address ? (
                    <>
                      <div className="col">
                        Delivery To: {auth?.user?.address}
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-outline-dark"
                          on
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-dark"
                          on
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-dark"
                          on
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Login To CheckOut
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn but"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
