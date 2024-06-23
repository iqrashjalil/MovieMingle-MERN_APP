import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home.jsx";
import All_Movies from "./pages/movies/All_Movies.jsx";
import Mvoie_Details from "./pages/movies/Mvoie_Details.jsx";
import Register from "./pages/admin/auth/Register.jsx";
import Signin from "./pages/admin/auth/Signin.jsx";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Admin_Dashboard from "./pages/admin/dashboard/Admin_Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Admin_All_Movies from "./pages/admin/dashboard/Admin_All_Movies.jsx";
import All_Requests from "./pages/admin/dashboard/All_Requests.jsx";
import Add_Movie from "./pages/admin/dashboard/Add_Movie.jsx";
import Edit_Movie from "./pages/admin/dashboard/Edit_Movie.jsx";
import Only_Movies from "./pages/movies/Only_Movies.jsx";
import Only_Shows from "./pages/movies/Only_Shows.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all/movies" element={<All_Movies />} />
          <Route path="/all/onlymovies" element={<Only_Movies />} />
          <Route path="/all/onlyshows" element={<Only_Shows />} />
          <Route path="/movie/detail/:id" element={<Mvoie_Details />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/signin" element={<Signin />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute Component={Admin_Dashboard} />}
          />
          <Route
            path="/admin/viewallmovies"
            element={<ProtectedRoute Component={Admin_All_Movies} />}
          />
          <Route
            path="/admin/viewallrequests"
            element={<ProtectedRoute Component={All_Requests} />}
          />
          <Route
            path="/admin/addmovie"
            element={<ProtectedRoute Component={Add_Movie} />}
          />
          <Route
            path="/admin/editmovie/:id"
            element={<ProtectedRoute Component={Edit_Movie} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
