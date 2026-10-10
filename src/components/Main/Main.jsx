import Home from "./Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";

const Main = () => {

  return (
    <div className="principal">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>)
};

export default Main;
