import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListSales = () => {
  const [sales, setSales] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sales");
      setSales(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", second: "numeric" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filterSalesByDate = () => {
    if (!selectedDate) {
      return sales;
    }
    const filteredSales = sales.filter(
      (sale) => formatDate(sale.createdAt) === formatDate(selectedDate)
    );
    return filteredSales;
  };

  return (
    <div className="table-responsive">
      <div className="mb-3">
        <label className="mr-2 fw-bold m-3">Select Date:</label>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>

      {filterSalesByDate().length === 0 ? (
        <div className="alert alert-danger text-center " role="alert">
          No List Sale
        </div>
      ) : (
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Item Type</th>
              <th scope="col">Total Sales</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {filterSalesByDate().map((sale, i) => (
              <tr key={i}>
                <td scope="row">{i}</td>
                <td>{sale.gasType}</td>
                <td>{sale.totalAvailable}</td>
                <td>{sale.kilos}</td>
                <td>{formatDate(sale.createdAt)}</td>
                <td>{formatTime(sale.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListSales;
