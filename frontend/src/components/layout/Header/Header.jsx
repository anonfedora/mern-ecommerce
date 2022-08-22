import React, { useState } from "react";
import "./Header.css";
import { ReactNavbar } from "overlay-navbar";
import { set } from "mongoose";
import { useSelector } from "react-redux";

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Shop
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {isAuthenticated ? (
            <li>
              <a href="/logout">Logout</a>
            </li>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
