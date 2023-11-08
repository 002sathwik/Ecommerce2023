import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Login from "./pages/auth/Login";
import Pagenotfound from "./pages/Pagenotfound";
import Regiser from "./pages/auth/Regiser";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Searchpage from "./pages/searchpage";
import Moreinfo from "./pages/Moreinfo";
import CartPage from "./pages/CartPage";
import ProfilePasswordreseet from "./pages/user/ProfilePasswordreseet";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profileset" element={<ProfilePasswordreseet />} />
      <Route path="/search" element={<Searchpage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/moreinfo/:slug" element={<Moreinfo />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/manage-orders" element={<AdminOrders />} />
        <Route path="admin/create-caterogy" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product" element={<Products />} />
        <Route path="admin/updateproduct/:slug" element={<UpdateProduct />} />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/register" element={<Regiser />} />
      <Route path="/forgotpassword" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;
