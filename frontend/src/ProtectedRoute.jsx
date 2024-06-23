import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { getUser } from "./store/slices/userSlice";

const ProtectedRoute = ({ Component }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const isAuthenticatedFromStorage = JSON.parse(
    localStorage.getItem("isAuthenticated")
  );

  useEffect(() => {
    if (
      isAuthenticatedFromStorage === null ||
      isAuthenticatedFromStorage === false
    ) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticatedFromStorage]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticatedFromStorage && !loading) {
    return <Navigate to="/admin/signin" />;
  }

  return <Component />;
};

export default ProtectedRoute;
