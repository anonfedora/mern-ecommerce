import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      console.log(keyword);
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <>
      <MetaData title="Search a Product" />
      <form onSubmit={searchSubmitHandler} className="search-box">
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
