import React, { Fragment } from "react";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useRef } from "react";
import { useState } from "react";
import { clearErrors, login } from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpen from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutline from "@material-ui/icons/MailOutline";
import { useEffect } from "react";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar"){
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2){
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }else{
      setUser({...user, [e.target.name]: e.target.value});
    }
  };
  console.log(location);
  const redirect = location.search ? location.search.split("=")[1] : "/account";


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  useEffect(() => {
    if (error){
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if (isAuthenticated){
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form action="" ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              
              </form>
              <form
                encType="multipart/form-data"
                ref={registerTab }
                onSubmit={registerSubmit}
                className="sign-up-form"
              >
                <div className="signUpName">
                <FaceIcon/>
                <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                <MailOutline/>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                <LockOpen/>
                <input
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview } alt="Avatar Preview" />
                  <input type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange} />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
