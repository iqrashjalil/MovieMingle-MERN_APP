import React, { useEffect, useState } from "react";
import "./form.css";
import { clearError, login } from "../../../store/slices/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const hnadleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/admin/dashboard");
      toast.success("User Login Successfully");
    }
  }, [dispatch, error, isAuthenticated, toast, navigate]);
  return (
    <>
      <section className="auth-section">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <div className="auth-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Here"
                required
                onChange={hnadleLoginChange}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password Here"
                required
                onChange={hnadleLoginChange}
              />
            </div>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signin;
