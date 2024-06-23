import React, { useEffect, useState } from "react";
import "./form.css";
import { clearError, register } from "../../../store/slices/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <>
      <section className="auth-section">
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <h2>Admin Registration</h2>
            <div className="auth-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name Here"
                required
                onChange={handleRegisterChange}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Here"
                required
                onChange={handleRegisterChange}
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
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit" className="auth-button">
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
