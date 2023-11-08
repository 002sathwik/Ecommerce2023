import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'; 
import { Carousel as BootstrapCarousel } from "react-bootstrap";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [cart, setCart] = useCart();

  //get all product--------------------------------------------------------------------------------------
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product//product-list/${page}`); //replace wirh loadmore API
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // Lifecycle Method
  useEffect(() => {
    getAllProducts();
    getTotal();
    // eslint-disable-next-line
  }, []);

  // Get all category function-------------------------------------------------------
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
    if (!checked.length || !radio.length) {
      getallCategory();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterproduct();
    }
    //eslint-disable-next-line
  }, [checked, radio]);

  useEffect(() => {
    if (page !== 1) loadMore();
    //eslint-disable-next-line
  }, [page]);

  //getTotalcount of product---------------------------------------------------------------
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //loadmore---------------------------------------------------------------------------------

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product//product-list/${page}`);
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //handel filter  category funtion()--------------------------------------------------------
  const handelFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    console.log("Checked Categories: ", all);
    setChecked(all);
  };

  //get filtered product--------------------------------------------------------------
  const filterproduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };
  const handleAddToCart = (product) => {
    if (isProductInCart(product._id)) {
      // The product is already in the cart, navigate to the cart page
      navigate("/cart");
    } else {
      // The product is not in the cart, add it
      product.quantity = 1;
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product])); // Sending to local Storage
      toast.success("Item Added To Cart");
    }
  };
  // The empty dependency array ensures this runs after the component has rendered.
  const images = [
    "https://asmenshops.com/images/default-images/banner-1.jpg",
    "https://asmenshops.com/images/default-images/banner-3.jpg",
    "https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg",
    "https://asmenshops.com/images/default-images/banner-2.jpg",
    "https://www-cdn.bigcommerce.com/assets/Article-Header_Ecommerce_Website.jpg",
  ];
  const testimonials = [
    {
      content:
        "Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.",
      author: "Sarah M., Director of Events",
      image: "/images/b3.jpeg", // Replace 'image1.jpg' with the actual image file path
    },
    {
      content:
        "I cannot tell you how much we loved using this silent auction software. Everything was seamless…from set up, to bidding, to payment. We will absolutely use MyEvent next year.",
      author: "Sarah M., CCHS Foundation",
      image: "/images/b2.jpg", // Replace 'image2.jpg' with the actual image file path
    },
    {
      content:
        "I tried MyEvent instead of typical paper raffle tickets. The system was easy to set up online and people who couldn't attend the event were still able to enter the raffle, which was HUGE bump in revenue.",
      author: "Alexander B., Pan-Mass Challenge",
      image: "/images/b1.png", // Replace 'image3.jpg' with the actual image file path
    },
  ];
  return (
    <div>
      <Layout title={"Best-Offers-epark"}>
        <div className="constainer-fluid  mt-3 ">
          <div className="col-sm-12  banner">
            <div className="row">
              <div className="box">
                <Carousel
                  useKeyboardArrows={true}
                  autoPlay={true}
                  interval={1800}
                  infiniteLoop={true}
                >
                  {images.map((URL, index) => (
                    <div className="slide" key={index}>
                      <img alt="sample_file" src={URL} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>

          {/* //-----------------------------------------------------------------------------------------// */}
          {/* <!-- Carousel wrapper --> */}

          <div className="container">
            <BootstrapCarousel interval={1500}>
              {testimonials.map((testimonial, index) => (
                <BootstrapCarousel.Item key={index}>
                  <div className="testimonial-container">
                    <div className="testimonial-image">
                      <img
                        src={testimonial.image}
                        alt={`Testimonial Image ${index + 1}`}
                        className="circular-image"
                      />
                    </div>
                    <div className="container-fluid">
                      <div className="row m-5">
                        <div className="col m-5">
                          <BootstrapCarousel.Caption>
                            <div className="testimonial-content">
                              <div className="aceele-infos">
                                <span className="signup-infos">{`"${testimonial.content}"`}</span>
                                <div className="awnor-infos">
                                  <span className="signup-infos">
                                    {`- ${testimonial.author}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </BootstrapCarousel.Caption>
                        </div>
                      </div>
                    </div>
                  </div>
                </BootstrapCarousel.Item>
              ))}
            </BootstrapCarousel>
          </div>

          {/* More content on your page */}
        </div>

        <div className="constainer-fluid mt-5">
          <div className="row mainrow">
            <div className="col-md-2  mainrow">
              <h2 className="text-center m-3 mb-3 filter">FILTERS</h2>
              <h2 className="text-center m-3 category">Category</h2>
              <div className="flex-column">
                {categories?.map((c) => (
                  <div key={c._id} className="form-check">
                    <Checkbox
                      onChange={(e) => handelFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
              {/* //price filter */}
              <h2 className="text-center m-3 category">Price</h2>
              <div className="flex-column ms-3 mb-3">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="flex-column ms-5 mb-3">
                <button
                  className="btn btn-warning"
                  onClick={() => window.location.reload()}
                >
                  Reset Filter
                </button>
              </div>
            </div>
            <div className="col-md-10">
              <h2 className="text-center mb-5">
                ALL PRODUCTS WITH BEST OFFERS
              </h2>
              <div className="row homecard">
                {products?.map((p, index) => (
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
                          src={`/api/v1/product/get-photo/${p._id}`}
                          alt={p.name}
                          style={{ width: "180px", height: "150px" }} // Adjust the width and height values as needed
                        />

                        <div className="card-body">
                          <h5 className="card-title cname">{p.name}</h5>
                          <hr />

                          <p className="card-text ">{p.description}</p>
                          <p className="card-text ">
                            Price: ₹<span className="price">{p.price}/-</span>
                          </p>
                          <Link key={p._id} to={`/moreinfo/${p.slug}`}>
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
                            onClick={() => handleAddToCart(p)}
                          >
                            {isProductInCart(p._id)
                              ? "Go to Cart"
                              : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
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
                    {loading ? "Loading..." : "LoadMore..."}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
