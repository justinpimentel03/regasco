import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Main from "./components/main/Main";
import Sub from "./components/Sub";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sub" element={<Sub />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
