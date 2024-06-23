import React, { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { RiMovieFill, RiSlideshow3Fill } from "react-icons/ri";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";
import logo from "../../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/all/movies?search=${search}`);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out");
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, []);
  return (
    <header>
      <img src={logo} alt="Logo" />

      <div className={`navbar-left ${menuOpen ? "open" : ""}`}>
        <ul>
          <NavLink to={"/"} onClick={closeMenu}>
            <IoHomeSharp className="navbar-icon" />
            Home
          </NavLink>
          <NavLink to={"/all/onlymovies"} onClick={closeMenu}>
            <RiMovieFill className="navbar-icon" />
            Movies
          </NavLink>
          <NavLink to={"/all/onlyshows"} onClick={closeMenu}>
            <RiSlideshow3Fill className="navbar-icon" />
            Web Series
          </NavLink>
        </ul>
      </div>
      {isAuthenticated ? (
        ""
      ) : (
        <div className="navbar-right">
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              placeholder="Search Movies & Web Series"
            />
            <button onClick={handleSearch} className="search-btn">
              <FaSearch className="search-icon" />
            </button>
          </form>
        </div>
      )}
      {isAuthenticated ? (
        <>
          <button className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        </>
      ) : (
        ""
      )}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes className="hamburger-icon" /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;
