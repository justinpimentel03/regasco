import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSale = ({ fetchSales }) => {
  const initialFormState = {
    gasType: "",
    totalAvailable: "",
    kilos: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/add",
        formState
      );
      setError("");
      setMessage(response.data.message);
      setFormState(initialFormState);
      fetchSales();
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data.message);
      setMessage("");
    }
  };

  useEffect(() => {
    const modal = document.getElementById("exampleModal");

    const resetFormFields = () => {
      setFormState(initialFormState);
    };

    modal.addEventListener("hidden.bs.modal", resetFormFields);

    return () => {
      modal.removeEventListener("hidden.bs.modal", resetFormFields);
    };
  }, [initialFormState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Sale
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddSale}>
                <div className="mb-3">
                  <label className="col-form-label">Item Type:</label>
                  <input
                    onChange={handleInputChange}
                    value={formState.gasType}
                    placeholder="Enter item type"
                    type="text"
                    className="form-control"
                    name="gasType"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Item to add:</label>
                  <input
                    onChange={handleInputChange}
                    value={formState.totalAvailable}
                    type="number"
                    className="form-control"
                    placeholder="Enter the item that you want to add"
                    name="totalAvailable"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Price:</label>
                  <input
                    onChange={handleInputChange}
                    value={formState.kilos}
                    type="number"
                    className="form-control"
                    placeholder="Enter the price"
                    name="kilos"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss={`${error ? "" : "modal"}`}
                  >
                    Add
                  </button>
                </div>

                {message && (
                  <div
                    className="alert alert-success mt-2 p-0 px-2 py-2 d-flex  flex-column "
                    role="alert"
                  >
                    <p>{message}</p>
                  </div>
                )}
                {error && (
                  <div
                    className="alert alert-danger mt-2 p-0 px-2 py-2 d-flex  flex-column "
                    role="alert"
                  >
                    <p>{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSale;
