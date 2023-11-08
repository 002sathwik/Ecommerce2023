import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [price, setprice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //get all catgory---------------------------------------------------------------
  const getallCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getcategory");
      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong while getting category");
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);

  //create new product-------------------------------------------------------------------
  const handelCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } =  await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data.success) {
        toast.success("New Product Added");
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };//--------------------------------------------------------------------------------------------
  return (
    <Layout title={"create-product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-6 ">
            <h1>Create-Product</h1>
            <div className="m-1 w-80">
              <Select
                bordered={false}
                placeholder="Switch a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Uplode-photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => setPhoto(e.target.files[0])} //geting image
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-2 ">
            <div className="md-4 m-4 ">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)} //displaying image
                    alt="Product-Img"
                    height={"150px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col md-2">
            <h1>FIll THE FORM TO ADD NEW PRODUCT</h1>
          </div>
          <div className="col md-10">
            <form
              className="productform"
              style={{ padding: "20px", width: "400px" }}
            >
              <div className="form-row">
                <div
                  className="form-group col-md-6"
                  style={{ marginBottom: "10px" }}
                >
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className="form-group col-md-6"
                  style={{ marginBottom: "10px" }}
                >
                  <textarea
                    value={description}
                    placeholder="Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: "100px", width: "350px" }} // Adjust the height as needed
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div
                  className="form-group col-md-6"
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    bordered={false}
                    placeholder="Shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="md-3">
                  <button className="btn btn-success" onClick={handelCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
