import React from 'react';
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
        <a href="mailto:musaeleazar090@gmail.com" className="mailBtn">
            <Button>Contact: musaeleazar090@gmail.com</Button>
        </a>
    </div>
  )
}

export default Contact