import { Avatar, Button, Typography } from "@material-ui/core";
import Twitter from "@material-ui/icons/Twitter";
import Web from "@material-ui/icons/Web";

import React from "react";
import "./About.css";

const About = () => {
  const visitTwitter = () => {
    window.location = "https://twitter.com/MusaEleazar1";
  };
  return (
    <div className="about-section">
      <div></div>
      <div className="aboutSecitonGradient"></div>
      <div className="about-section-container">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/jpyibarlaxawvcvqjv5b.png"
              alt="Founder"
            />
            <Typography>Musa Eleazar Shekoaga</Typography>
            <Button onClick={visitTwitter} color="primary">
              Visit Twitter
            </Button>
            <span>
              This is a sample web application created by @anonfedora. It is a
              MERN Stack application.
            </span>
          </div>
          <div className="about-section-container2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://super-basbousa-130d7c.netlify.app/"
              target="blank"
            >
              <Web className="youtubeSvgIcon" />
            </a>

            <a href="https://mobile.twitter.com/MusaEleazar1" target="blank">
              <Twitter className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
