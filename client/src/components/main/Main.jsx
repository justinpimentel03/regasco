import React from "react";
import Header from "./Header";
import ListSales from "./ListSales";

const Main = () => {
  return (
    <div className="w-auto">
      <div className="d-flex flex-column py-4 align-items-center justify-content-center bg-danger">
        <img
          src="/logo.png"
          alt="logo"
          className="img-fluid img-responsive"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
        <h1 className="fw-bold fs-2 text-white">Republic Gas Corporation</h1>
      </div>
      <div className="px-2 container-xxl">
        <Header />
        <ListSales />
      </div>
    </div>
  );
};

export default Main;
