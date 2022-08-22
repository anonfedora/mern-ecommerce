import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/userActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import Payment from "./components/Cart/Payment";
import LoginSignUp from "./components/User/LoginSignUp";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/User/Profile";
import NotFound from "./components/layout/Not Found/NotFound";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import Header from "./components/layout/Header/Header";
import UserOptions from "./components/layout/Header/UserOptions";
import axios from "axios";
import Search from "./components/Product/Search";
import Products from "./components/Product/Products";
import MyOrders from "./components/Order/MyOrders";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderDetails from "./components/Order/OrderDetails";
import OrderSuccess from "./components/Cart/OrderSuccess";
import Shipping from "./components/Cart/Shipping";
import ProductDetails from "./components/Product/ProductDetails";
import ResetPassword from "./components/User/ResetPassword";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdateProfile from "./components/User/UpdateProfile";
import Cart from "./components/Cart/Cart";
import Sidebar from "./components/Admin/Sidebar";
import ProductList from "./components/Admin/ProductList";
import Dashboard from "./components/Admin/Dashboard";
import NewProduct from "./components/Admin/NewProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import ProductReviews from "./components/Admin/ProductReviews";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UpdateUser from "./components/Admin/UpdateUser";
import UsersList from "./components/Admin/UsersList";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const role = user?.role;
  console.log(role);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Robot", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route path="/account" element={ <ProtectedRoute> <Profile/> </ProtectedRoute> }/>
          <Route path="/me/update" element={ <ProtectedRoute> <UpdateProfile/> </ProtectedRoute> }/>
          <Route path="/password/update" element={ <ProtectedRoute> <UpdatePassword /> </ProtectedRoute> }/>
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sidebar" element={<Sidebar />} />

          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role={role}>
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role={role}>
                <ProductList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute role={role}>
                <NewProduct />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute role={role}>
                <UpdateProduct />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role={role}>
                <OrderList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute role={role}>
                <ProcessOrder />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role={role}>
                <UsersList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute role={role}>
                <UpdateUser />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute role={role}>
                <ProductReviews />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            element={
              window.location.pathname === "/process/payment" ? null : (
                <NotFound />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
