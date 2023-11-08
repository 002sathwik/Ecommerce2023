import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const Searchpage = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart(); // Destructure the values from useSearch

  return (
    <Layout title={"Search Result"}>
      <div className="container m-3 p-3">
        <Link to={"/"}>
          <AiOutlineArrowLeft
            className="m-2"
            style={{ fontSize: "2rem", color: "black" }}
          />
        </Link>
        <div className="text-center">
          <h1>Search Result</h1>
          <h5>
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length} products`}
          </h5>
        </div>
        <div className="row homecard">
          {values?.results.map(
            (
              p,
              index // Map over values.results, not values
            ) => (
              <div key={p._id} className="col-md-3">
                <div
                  className="card homeCard"
                  style={{
                    margin: "10px",
                    padding: "10px",
                    border: "1.5px solid black",
                    width: "220px",
                    height: "380px",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={`/api/v1/product/get-photo/${p._id}`}
                    alt={p.name}
                    style={{ width: "180px", height: "150px" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title cname">{p.name}</h5>
                    <hr />

                    <p className="card-text">{p.description}</p>
                    <p className="card-text">
                      Price: $<span className="price">{p.price}</span>
                    </p>
                    <Link  key={p._id} to={`/moreinfo/${p.slug}`}>
                      <button
                        className="btn btn-info ms-1"
                        style={{ border: "1px solid black" }}
                      >
                        More
                      </button>
                    </Link>
                    <button
                      className="btn btn-light addcartbtn ms-1"
                      style={{ border: "1px solid black" }}
                      onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem('cart',JSON.stringify([...cart,p]))//sending to local Storage
                              toast.success("Item Added To Cart");
                            }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Searchpage;
