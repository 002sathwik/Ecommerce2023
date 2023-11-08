import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Initialize as false
  const [total, setTotal] = useState(0);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`); // Remove extra slash
      setLoading(false);
      setProducts(data.products);
      setTotal(data.total); // Set the total based on API response
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle Method
  useEffect(() => {
    getAllProducts();
    getTotal();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page !== 1) loadMore();
    //eslint-disable-next-line
  }, [page]);
  return (
    <Layout title={"product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-8">
            <div className="row bg-light">
              <h1>Product - List</h1>
            </div>

            <div className="row">
              {products?.map((p, index) => (
                <div className="col-md-3" key={p._id}>
                <Link
                  key={p._id}
                  to={`/dashboard/admin/updateproduct/${p.slug}`}
                  className="ProductCard"
                >
                  <div
                    className="card homeCard"
                    style={{
                      margin: "10px",
                      padding: "10px",
                      border: "1.5px solid black",
                      width: "205px",
                      height: "350px",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/get-photo/${p._id}`}
                      alt={p.name}
                      style={{ width: "150px", height: "120px" }}
                    />

                    <div className="card-body">
                      <hr />
                      <h5 className="card-title cname">{p.name}</h5>

                      <p className="card-text">{p.description}</p>

                      <p className="card-text">
                        Quantity:{" "}
                        <span style={{ color: "orange" }}>{p.quantity}</span>
                      </p>

                      <p className="card-text">
                        Price: ₹<span className="price">{p.price}/-</span>
                      </p>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="m-3 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-outline-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More..."}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
