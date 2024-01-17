import React, { useState } from "react";
import NavBar from "./NavBar";
import TableSale from "./TableSale";
import axios from "axios";
import Report from "./Report";
import { toast } from "react-hot-toast";
import Footer from "./Footer";

const Sub = () => {
  const [sales, setSales] = useState([]);
  const [report, setReport] = useState([]);
  const [totalAvailable, setTotalAvailable] = useState("");
  const [kilos, setKilos] = useState("");
  const [error, setError] = useState("");

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sales");
      setSales(response.data);
      console.log(response.data);

    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleReport = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/sale/${id}`);
      setReport(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSendReport = async (id, formData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/decrement/${id}`,
        {
          decrementTotalAvailable: formData.totalAvailable,
          decrementKilos: formData.kilos,
        }
      );

      toast.success(response.data.message);
      setError("");
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data.message);
    }
  };

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
      <div className="px-2">
        <NavBar fetchSales={fetchSales} />
        <Report
          report={report}
          setTotalAvailable={setTotalAvailable}
          totalAvailable={totalAvailable}
          setKilos={setKilos}
          handleSendReport={handleSendReport}
          kilos={kilos}
          error={error}
          fetchSales={fetchSales}
        />
        <TableSale
          fetchSales={fetchSales}
          sales={sales}
          setSales={setSales}
          handleReport={handleReport}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Sub;
