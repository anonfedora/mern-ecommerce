import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/userActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import Home from "./components/Home/Home";
import Payment from "./components/Cart/Payment";
import LoginSignUp from "./components/User/LoginSignUp";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/User/Profile";
import NotFound from "./components/layout/Not Found/NotFound";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import UserOptions from "./components/layout/Header/UserOptions";
import axios from "axios";
import Search from "./components/Product/Search";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import ResetPassword from "./components/User/ResetPassword";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdateProfile from "./components/User/UpdateProfile";
import Cart from "./components/Cart/Cart";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get(`/api/v1/stripeapikey`);
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
        <Header/>
        {console.log(isAuthenticated)}
        {isAuthenticated && <UserOptions user={user}/>}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route path="/process/payment" element={
            <ProtectedRoute><Profile/></ProtectedRoute>
          }/>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignUp/>} />
          <Route path="/account" element={<Profile/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/header" element={<Header/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/password" element={<ResetPassword/>} />
          <Route path="/password/update" element={<UpdatePassword/>} />
          <Route path="/profile/update" element={<UpdateProfile/>} />
          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/process/payment" element={
            <ProtectedRoute><Payment/></ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
