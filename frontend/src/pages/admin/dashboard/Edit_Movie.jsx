import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin_Sidebar from "../sidebar/Admin_Sidebar";
import "./addmovie.css";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  clearError,
  editMovie,
  movieDetail,
} from "../../../store/slices/moviesSlice";
import { useParams } from "react-router-dom";

const genresList = [
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

const Edit_Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, message, movieDetails } = useSelector((state) => state.movies);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    genres: [],
    vote_average: "",
    id: "",
    type: "",
    trailer: "",
    language: "",
    video_quality: "",
    download_link: "",
  });
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((item) => item !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    setFormData((prevData) => ({
      ...prevData,
      genres: updatedGenres,
    }));
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie({ movieId: id, updatedData: formData }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (id) {
      dispatch(movieDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (movieDetails) {
      setFormData({
        title: movieDetails.title || "",
        overview: movieDetails.overview || "",
        release_date: movieDetails.release_date || "",
        poster_path: movieDetails.poster_path || "",
        genres: movieDetails.genres.map((genre) => genre) || [],
        vote_average: movieDetails.vote_average || "",
        id: movieDetails.tmdb_id || "",
        type: movieDetails.type || "",
        trailer: movieDetails.trailer || "",
        language: movieDetails.language || "",
        video_quality: movieDetails.video_quality || "",
        download_link: movieDetails.download_link || "",
      });
      setSelectedGenres(
        movieDetails && movieDetails.genres
          ? movieDetails.genres.map((genre) => genre)
          : []
      );
    }
  }, [movieDetails]);

  return (
    <>
      <section className="add-movie-section">
        <div className="add-movie-left">
          <Admin_Sidebar />
        </div>

        <div className="add-movie-right">
          <div className="addmovieheading">
            <h1>Edit Movie</h1>
          </div>

          <div className="form-wrapper">
            <form className="addmovie-form" onSubmit={handleSubmit}>
              <div className="form-wrapper-left">
                <div className="input">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter Movie Title Here"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="overview">Overview</label>
                  <textarea
                    name="overview"
                    required
                    rows="10"
                    placeholder="Enter Movie Overview Here"
                    value={formData.overview}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="release_date">Release Date</label>
                  <input
                    type="text"
                    name="release_date"
                    required
                    placeholder="Enter Release-Date Here"
                    value={formData.release_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="poster_path">Poster Path</label>
                  <input
                    type="text"
                    name="poster_path"
                    required
                    placeholder="Give Poster Path Here"
                    value={formData.poster_path}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="genres">Genres</label>
                  <div className="select-container" ref={dropdownRef}>
                    <div className="select" onClick={handleDropdownClick}>
                      {selectedGenres.length > 0
                        ? selectedGenres.join(", ")
                        : "Select Genres"}
                      <FaChevronDown className="select-icon" />
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown">
                        {genresList.map((genre, index) => (
                          <div key={index} className="checkbox-item">
                            <input
                              type="checkbox"
                              id={genre}
                              name="genres"
                              value={genre}
                              checked={selectedGenres.includes(genre)}
                              onChange={() => handleCheckboxChange(genre)}
                            />
                            <label htmlFor={genre}>{genre}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="input">
                  <label htmlFor="language">Language</label>
                  <input
                    type="text"
                    name="language"
                    required
                    placeholder="Enter Language Of The Movie Hindi/English"
                    value={formData.language}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <hr className="addmovie-hr" />
              <div className="form-wrapper-right">
                <div className="input">
                  <label htmlFor="vote_average">Votes</label>
                  <input
                    type="text"
                    name="vote_average"
                    required
                    placeholder="Total Votes On TMDB"
                    value={formData.vote_average}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="video_quality">Video Quality</label>
                  <input
                    type="text"
                    name="video_quality"
                    required
                    placeholder="Type Video Quality Of The Movie"
                    value={formData.video_quality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type Movie/Show</option>
                    <option value="Movie">Movie</option>
                    <option value="Show">Show</option>
                  </select>
                </div>
                <div className="input">
                  <label htmlFor="trailer">Trailer Link</label>
                  <input
                    type="text"
                    name="trailer"
                    required
                    placeholder="Paste Youtube Trailer Link"
                    value={formData.trailer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="download_link">Download Link</label>
                  <input
                    type="text"
                    name="download_link"
                    required
                    placeholder="Paste Download Link Here"
                    value={formData.download_link}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="id">TMDB ID</label>
                  <input
                    type="text"
                    name="id"
                    required
                    placeholder="Enter TMDB ID Here"
                    value={formData.id}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="form-button" type="submit">
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit_Movie;
