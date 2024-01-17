import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginForm = () => {
  const [role, setRole] = useState("main");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://regasco.onrender.com/api/login", {
        role,
        username,
        password,
      });

      switch (role) {
        case "main":
          navigate("/main");
          break;
        case "sub":
          navigate("/sub");
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="text-center my-5 ">
              <img src="/logo.png" alt="logo" width="100" />
            </div>
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="mb-3">
                    <label className="mb-2 text-muted ">Role</label>
                    <select
                      className="form-select "
                      aria-label="Default select example"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="main">Main Branch</option>
                      <option value="sub">Sub Branch</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      autoFocus
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted">Password</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="w-100">
                    <button
                      type="submit"
                      className="btn btn-primary ms-auto w-100"
                    >
                      Login
                    </button>
                  </div>

                  {error && (
                    <div
                      className="alert alert-danger mt-2 p-0 px-2"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center text-muted">
                  Copyright &copy; 2023-2024 &mdash; Regasco
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
