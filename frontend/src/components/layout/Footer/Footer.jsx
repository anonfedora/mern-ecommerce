import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>GET OUR APP</h4>
        <p>Download App for Android and IOS</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>

      <div className="midFooter">
        <h1>SHOP.</h1>
        <p>High Quality is our priority</p>
        <p>Copyrights 2022 &copy; Musa Eleazar</p>
      </div>

      <div className="rightFooter">
      <h4>Follow Us</h4>
        <a href="https://mobile.twitter.com/MusaEleazar1">Twitter</a>
        <a href="https://www.linkedin.com/in/eleazar-shekoaga-musa-09a70519a">LinkedIn</a>
        <a href="https://www.facebook.com/eleazar.musa.1">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
