import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setcategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [selected, setselelcted] = useState("");
  const [updatedName, setupdatedName] = useState("");

  // Handel form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(data.message);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };

  // Get all category function
  const getallCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getcategory");
      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);

  // Handel Update function
  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setselelcted(null);
        setupdatedName("");
        setVisible(false);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update error");
    }
  };

  // Handel Delete function
  const handelDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success("Deleted");
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete error");
    }
  };

  
//new code creating new new div coloums
  return (
    <Layout title={"Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div>
              <CategoryForm
                handelSubmit={handelSubmit}
                value={name}
                setValue={setName}
              />
            </div>
          </div>
        </div>
        <div className="row m-3">
          {categories.map((c, index) => {
            if (index % 5 === 0) {
              // Start a new column every 5 categories
              return (
                <div className="col-md-4" key={index}>
                  <div className="CreateCategory">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.slice(index, index + 5).map((category) => (
                          <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                              <button
                                className="btn btn-primary m-2"
                                onClick={() => {
                                  setVisible(true);
                                  setupdatedName(category.name);
                                  setselelcted(category);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  handelDelete(category._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Modal
                      onCancel={() => setVisible(false)}
                      footer={null}
                      visible={visible}
                    >
                      <CategoryForm
                        value={updatedName}
                        setValue={setupdatedName}
                        handelSubmit={handelUpdate}
                      />
                    </Modal>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </Layout>
  );
  
};

export default CreateCategory;
