import React from "react";
import "./footer.css";
import { IoHomeSharp } from "react-icons/io5";
import { RiMovieFill, RiSlideshow3Fill } from "react-icons/ri";
import { FaPlay, FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import logo from "../../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  const handleGenre = (genre) => {
    navigate(`/all/movies?genre=${genre}`);
  };
  return (
    <>
      <footer>
        <div className="footer-left">
          <img src={logo} alt="Logo" />
          <h1>
            <span>Movie</span> Mingle
          </h1>
          <pre>
            <p>
              The No#1 Place for Downloading <br />
              Movies and Web-Series.
            </p>
          </pre>
        </div>
        <hr className="footer-hr" />
        <div className="footer-center">
          <div className="footer-genres">
            <h1>Genres</h1>
            <ul>
              {genres.map((genre, index) => (
                <li
                  onClick={() => handleGenre(genre)}
                  key={index}
                  value={genre}
                >
                  <FaPlay className="footer-play-icon" />
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="footer-hr" />
        <div className="socials">
          <h1>Socials </h1>
          <ul>
            <NavLink
              to={"https://www.facebook.com/saad.mehboob.35?mibextid=wwXIfr&rdid=R85fwOy0qRKBhHVa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FoouAayf1%2F%3Fmibextid%3DwwXIfr#"}
              className="facebook-li"
            >
              {" "}
              <FaFacebook className="footer-facebook-icon" /> Facebook
            </NavLink>
            <NavLink
              to={"https://www.instagram.com/saadmehboob25?igsh=MXBpanU2MGptZG9reQ%3D%3D&utm_source=qr"}
              className="instagram-li"
            >
              {" "}
              <FiInstagram className="footer-instagram-icon" /> Instagram
            </NavLink>
          </ul>
        </div>
        <hr className="footer-hr" />
        <div className="footer-right">
          <ul>
            <NavLink to={"/"}>
              <IoHomeSharp className="navbar-icon" />
              Home
            </NavLink>
            <NavLink to={"/all/onlymovies"}>
              <RiMovieFill className="navbar-icon" />
              Movies
            </NavLink>
            <NavLink to={"/all/onlyshows"}>
              <RiSlideshow3Fill className="navbar-icon" />
              Web Series
            </NavLink>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
