import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import getAllProducts from "./Products";

const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState(""); // New state for selected category ID
  const [category, setCategory] = useState(null); // New state for selected category object
  // New state for selected category object
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.slug}`
      );
      setName(data.Singleproduct.name);
      setId(data.Singleproduct._id);
      setSelectedCategoryID(data.Singleproduct.category._id);
      setPrice(data.Singleproduct.price);
      setQuantity(data.Singleproduct.quantity);
      setShipping(data.Singleproduct.shipping);
      setDescription(data.Singleproduct.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
    //eslint-disable-next-line
  }, []);

  const getallCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getcategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      productData.append("category", selectedCategoryID);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated");
        navigate("/dashboard/admin/product");
        getAllProducts();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //belete product funtioin ()----------------------------------------------------------

  const handelDelete = async () => {
    try {
      let answer = window.prompt(
        "Are You Sure You want To Delete This Product ?"
      );
      if (answer) {
        // If the user provides an answer (i.e., not null or empty string), then proceed with the deletion
        const { data } = await axios.delete(
          `/api/v1/product/delete-product/${id}`
        );
        if (data.success) {
          toast.success("Deleted");
          getAllProducts();
        } else {
          toast.error("Error on Deletion");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"create-product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>Manage-Product</h1>
            <div className="m-1 w-80">
              <Select
                bordered={false}
                placeholder="Switch a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSelectedCategoryID(value);
                  const selectedCategory = categories.find(
                    (c) => c._id === value
                  );
                  setCategory(selectedCategory); // Set category object
                }}
                value={selectedCategoryID}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="md-4 m-4">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product-Img"
                    height={"150px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/product/get-photo/${id}`}
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
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <h1>Fill the Form to Update Product</h1>
          </div>
          <div className="col-md-7">
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
                    style={{ height: "100px", width: "350px" }}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  S
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
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
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="md-3 m-3">
                  <button
                    className="btn btn-success m-1"
                    onClick={handelUpdate}
                  >
                    UPDATE PRODUCT
                  </button>
                  <button className="btn btn-danger m-1" onClick={handelDelete}>
                    DELETE PRODUCT
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

export default UpdateProduct;
