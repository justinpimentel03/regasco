import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const TableSale = ({ sales, fetchSales, handleReport }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  const handleDeleteSale = async (id) => {
    try {
      const response = await axios.delete(
        `https://regasco.onrender.com/api/delete/${id}`
      );
      fetchSales();
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="table-responsive">
      {sales.length === 0 ? (
        <div className="alert alert-danger text-center " role="alert">
          No List Sale
        </div>
      ) : (
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Item Type</th>
              <th scope="col">Total Available</th>
              <th scope="col">Price</th>
              <th scope="col" id="printPageButton">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, i) => (
              <tr key={i}>
                <td scope="row">{i}</td>
                <td>{sale.gasType}</td>
                <td>{sale.totalAvailable}</td>
                <td>{sale.kilos}</td>
                <td id="printPageButton" className="w-25">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#report"
                    onClick={() => handleReport(sale._id)}
                    type="button"
                  >
                    Report
                  </button>

                  <button
                    onClick={() => handleDeleteSale(sale._id)}
                    type="button"
                    className="btn btn-danger m-2"
                  >
                    Remove Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableSale;
