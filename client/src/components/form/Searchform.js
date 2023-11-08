import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchform = () => {
  const [values, setValue] = useSearch();
  const navigate = useNavigate(); // Invoke useNavigate as a function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValue({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form-inline searchfrom"  style={{ color: "white" }}>
          <input
            className="form-control mr-sm-2 searchforminput"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValue({ ...values, keyword: e.target.value })}
          />
        </form>
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-outline-light mt-1"
          type="submit"
          onClick={handelSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchform;
