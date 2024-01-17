const Report = ({
  report,
  setTotalAvailable,
  setKilos,
  handleSendReport,
  totalAvailable,
  kilos,
  error,
  fetchSales,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        totalAvailable,
        kilos,
      };

      await handleSendReport(report._id, formData);
      fetchSales();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="report"
      tabIndex="-1"
      aria-labelledby="reportLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="reportLabel">
              Item Type:
              <span className="text-secondary m-3">{report.gasType}</span>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Total Sale:</strong>
              <span className="text-success m-3">{report.totalAvailable}</span>
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-success m-3">{report.kilos}</span>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="col-form-label">ITEMS:</label>
                <input
                  onChange={(e) => setTotalAvailable(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Enter pcs..."
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Price:</label>
                <input
                  onChange={(e) => setKilos(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Enter price..."
                />
              </div>

              <div className="modal-footer mt-5">
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
                  data-bs-dismiss={`${error ? "modal" : ""}`}
                >
                  Send Report
                </button>
              </div>
            </form>

            {error && (
              <div
                className="alert alert-danger mt-2 p-0 px-2  d-flex  flex-column "
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
