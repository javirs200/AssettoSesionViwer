import React from "react";
import Buscador from "./Buscador/Buscador";
import Details from "./Details/Details";
import Home from "./Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import New from "./New/New";
import SingleFileUploader from "./SingleFileUploader/SingleFileUploader";

const Main = () => {

  return (
    <div className="principal">
      <link rel="stylesheet" href="https://justingolden.me/pokemon-types-css/types.min.css"></link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploader" element={<SingleFileUploader />} />
        <Route path="/Pokemon/:id" element={<Details />} />
        <Route path="/search" element={<Buscador />} />
        <Route path="/new" element={<New />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>)
};

export default Main;
