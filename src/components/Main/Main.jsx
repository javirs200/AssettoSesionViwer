import React from "react";
import Home from "./Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";

const Main = () => {

  return (
    <div className="principal">
      <link rel="stylesheet" href="https://justingolden.me/pokemon-types-css/types.min.css"></link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>)
};

export default Main;
