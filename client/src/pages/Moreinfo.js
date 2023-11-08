import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Moreinfo = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  const [id, setId] = useState("");

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.slug}`
      );
      console.log(data);

      setId(data.Singleproduct._id);
      setProduct(data?.Singleproduct);
      getsmilarProduct(
        data?.Singleproduct._id,
        data?.Singleproduct.category._id
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // get Related Product--------------------------------------------------------------------
  const getsmilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related/${pid}/${cid}`);
      console.log(data);
      setRelated(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Layout title={`${product?.name} -MoreInfo`}>
        <div className="product header m-3">
          <h1>
            {" "}
            <Link to={"/"}>
              <AiOutlineArrowLeft
                className="m-2"
                style={{ fontSize: "2rem", color: "black" }}
              />
            </Link>
            PRODUCT_DETAILS
          </h1>
        </div>
        <hr />
        <div
          className="container m-6 mt-7 p-1"
          style={{ border: "1.5px solid black" }}
        >
          <div className="row ">
            <div className="col-md-6">
              <div className="text-center">
                <img
                  src={`/api/v1/product/get-photo/${id}`}
                  alt="Product-Img"
                  height={"380px"}
                  width={"360px"}
                  className="img img-responsive"
                />
              </div>
            </div>
      
            <div className="col-md-5 mt-2">
              <div
                className="card text-center"
                style={{ border: "1.5px solid black" }}
              >
                <div
                  className="card-header"
                  style={{ border: "1px solid black" }}
                >
                  Product Details
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <h2>{product?.name}</h2>
                  </h5>
                  <p className="card-text">
                    <p> Description:{product?.description}</p>
                    <p>
                      Price: $ <span className="price">{product?.price}</span>
                    </p>
                    <p>Category: {product?.category?.name}</p>
                  </p>
                  <p>
                    <span className="price">{product?.quantity}</span> items
                    left order fast
                  </p>
                  <button
                    className="btn btn-light addcartbtn ms-1"
                    style={{ border: "1px solid black" }}
                  >
                    Add to Cart
                  </button>
                  <Link to={"/"}>
                    <button
                      className="btn btn-info ms-3"
                      style={{ border: "1px solid black" }}
                    >
                      Back Home
                    </button>
                  </Link>
                </div>

                <div
                  className="card-footer text-muted"
                  style={{ border: "1px solid black" }}
                >
                  Best offer applied
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row m-2">
            <h1>SIMILAR_PRODUCT'S</h1>
            <div className="col-ms-4 mt-4">
            <div className="row homecard">
                {related?.map((products, index) => (
                  <>
                    {index > 0 && index % 4 === 0 && (
                      <div className="w-100" key={`row-${index}`} />
                    )}
                    <div className="col-md-3">
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
                          src={`/api/v1/product/get-photo/${products._id}`}
                          alt={products.name}
                          style={{ width: "180px", height: "150px" }} // Adjust the width and height values as needed
                        />

                        <div className="card-body">
                          <h5 className="card-title cname">{products.name}</h5>
                          <hr />

                          <p className="card-text ">{products.description}</p>
                          <p className="card-text ">
                            Price: $<span className="price">{products.price}</span>
                          </p>
                          <Link
                            key={products._id}
                            to={`/moreinfo/${products.slug}`}
                          >
                            <button
                              className="btn btn-info ms-1"
                              style={{ border: "1px solid black" }} onClick={`/moreinfo/${products.slug}`}
                            >
                              More
                            </button>
                          </Link>
                          <button
                            className="btn btn-light addcartbtn ms-1"
                            style={{ border: "1px solid black" }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Moreinfo;
