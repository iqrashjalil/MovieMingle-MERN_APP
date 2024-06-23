import React, { useEffect, useState } from "react";
import {
  fetchMovies,
  postRequestMovie,
  clearError,
  clearRequestMovie,
} from "../../store/slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaStar, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, requestMovie } = useSelector((state) => state.movies);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [formData, setFormData] = useState({
    requestedBy: "",
    movieName: "",
  });

  const handleRequestMovieChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitMovieRequest = (e) => {
    e.preventDefault();
    dispatch(postRequestMovie(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    } else if (requestMovie?.success) {
      toast.success(requestMovie.message);
      dispatch(clearRequestMovie());
    }
  }, [dispatch, error, requestMovie]);

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

  const years = [2023, 2022, 2021, 2020, 2019, 2018];
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {};
    if (selectedYear) {
      filters.year = selectedYear;
    }
    if (selectedRating) {
      filters.rating = selectedRating;
    }

    const query = new URLSearchParams(filters).toString();
    navigate(`/all/movies?${query}`);
  };

  const handleGenre = (genre) => {
    navigate(`/all/movies?genre=${genre}`);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-filters">
        <div className="heading">
          <h4>Filters</h4>
        </div>
        <div className="year">
          <div>
            <CiCalendarDate className="filter-icon" /> Year
          </div>
          <select
            name=""
            id=""
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="rating">
          <div>
            <FaStar className="filter-icon" /> Rating
          </div>
          <select
            name=""
            id=""
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="">Select Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <button className="filter-btn" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>
      <div className="sidebar-genres">
        <div className="heading">
          <h4>Genres</h4>
        </div>
        <div className="sidebar-genres-box">
          <ul>
            {genres.map((genre, index) => (
              <li onClick={() => handleGenre(genre)} key={index} value={genre}>
                <FaPlay className="genres-icon" />
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="request-movie">
        <div className="heading">
          <h4>Request A Movie</h4>
        </div>
        <form onSubmit={submitMovieRequest}>
          <div className="request-movie-input">
            <label htmlFor="requestedBy">Name</label>
            <input
              required
              type="text"
              name="requestedBy"
              placeholder="Enter Your Name"
              value={formData.requestedBy}
              onChange={handleRequestMovieChange}
            />
          </div>
          <div className="request-movie-input">
            <label htmlFor="movieName">Movie Name</label>
            <input
              required
              type="text"
              name="movieName"
              placeholder="Enter Movie Name"
              value={formData.movieName}
              onChange={handleRequestMovieChange}
            />
          </div>
          <button type="submit" className="filter-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
