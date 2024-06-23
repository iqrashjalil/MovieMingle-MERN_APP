import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin_Sidebar from "../sidebar/Admin_Sidebar";
import "./addmovie.css";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addMovie,
  clearError,
  fetchMoviesFromTMDB,
  fetchShowsFromTMDB,
} from "../../../store/slices/moviesSlice";
import Loader from "../../../components/Loader/Loader.jsx";
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

const Add_Movie = () => {
  const dispatch = useDispatch();
  const { error, message, loading, tmdbMoviesList, tmdbShowsList } =
    useSelector((state) => state.movies);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movieSearchResults, setMovieSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [showQuery, setShowQuery] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  console.log(isDropdownOpen);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
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
    setSelectedGenres((prevState) =>
      prevState.includes(genre)
        ? prevState.filter((item) => item !== genre)
        : [...prevState, genre]
    );
    setFormData((prevData) => ({
      ...prevData,
      genres: selectedGenres.includes(genre)
        ? selectedGenres.filter((item) => item !== genre)
        : [...selectedGenres, genre],
    }));
  };
  const handleMovieSelection = () => {
    setIsSearchOpen(false);
  };

  const handleShowSelection = () => {
    setIsSearchOpen(false);
  };
  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const fetchMovies = async (query) => {
    dispatch(fetchMoviesFromTMDB(query));
    setMovieSearchResults(tmdbMoviesList && tmdbMoviesList);
    if (movieSearchResults.length > 0) {
      setIsSearchOpen(true);
    }
  };

  const fetchShows = async (query) => {
    dispatch(fetchShowsFromTMDB(query));
    setShowSearchResults(tmdbShowsList && tmdbShowsList);

    if (showSearchResults.length > 0) {
      setIsSearchOpen(true);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=ea40221071160253ca46cfd1933ecd97`
    );

    const data = await response.json();
    setSelectedGenres(
      data && data.genres ? data.genres.map((genre) => genre.name) : []
    );

    setMovieDetails(data);
    setFormData({
      ...formData,
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      genres: selectedGenres,
      vote_average: data.vote_average,
      id: data.id,
      type: "Movie",
    });
  };

  const fetchShowDetails = async (showId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=ea40221071160253ca46cfd1933ecd97`
    );
    const data = await response.json();
    setSelectedGenres(
      data && data.genres ? data.genres.map((genre) => genre.name) : []
    );
    setShowDetails(data);
    console.log(showDetails && showDetails);
    setFormData({
      ...formData,
      title: data.name,
      overview: data.overview,
      release_date: data.first_air_date,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      genres: selectedGenres,
      vote_average: data.vote_average,
      id: data.id,
      type: "Show",
    });
  };

  useEffect(() => {
    if (movieQuery) {
      fetchMovies(movieQuery);
    } else {
      setMovieSearchResults([]);
    }
  }, [movieQuery]);

  useEffect(() => {
    if (showQuery) {
      fetchShows(showQuery);
    } else {
      setShowSearchResults([]);
    }
  }, [showQuery]);

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
    dispatch(addMovie(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, toast, message]);
  return (
    <>
      <section className="add-movie-section">
        <div className="add-movie-left">
          <Admin_Sidebar />
        </div>

        <div className="add-movie-right">
          <div className="addmovieheading">
            <h1>Add Movie</h1>
          </div>
          <div className="movie-search">
            <div className="input">
              <label htmlFor="movieSearch">Search Movie</label>
              <input
                type="search"
                name="movieSearch"
                required
                placeholder="Enter Movie Title Here To Search"
                value={movieQuery}
                onChange={(e) => {
                  setMovieQuery(e.target.value);
                }}
              />
              {movieSearchResults &&
                movieSearchResults.length > 0 &&
                isSearchOpen && (
                  <div className={`search-results-dropdown`}>
                    {movieSearchResults.map((movie) => (
                      <div
                        key={movie.id}
                        ref={dropdownRef}
                        className="search-result-item"
                        onClick={() => {
                          handleMovieSelection();
                          fetchMovieDetails(movie.id);
                        }}
                      >
                        {loading ? (
                          <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <>
                            <img
                              className="search-dropdown-img"
                              src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
                              alt=""
                            />
                            {movie.title}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="input">
              <label htmlFor="showSearch">Search Show</label>
              <input
                type="text"
                name="showSearch"
                required
                placeholder="Enter Show Title Here To Search"
                value={showQuery}
                onChange={(e) => setShowQuery(e.target.value)}
              />
              {showSearchResults &&
                showSearchResults.length > 0 &&
                isSearchOpen && (
                  <div className="search-results-dropdown">
                    {showSearchResults.map((show) => (
                      <div
                        key={show.id}
                        className="search-result-item"
                        onClick={() => {
                          handleShowSelection();
                          fetchShowDetails(show.id);
                        }}
                      >
                        {loading ? (
                          <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <>
                            <img
                              className="search-dropdown-img"
                              src={`https://image.tmdb.org/t/p/w780${show?.poster_path}`}
                              alt=""
                            />
                            {show.name}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
          <hr className="new-hr" />
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
                  <label htmlFor="poster_path">Backdrop Path</label>
                  <input
                    type="text"
                    name="poster_path"
                    required
                    placeholder="Give Backdrop Image Path Here"
                    value={formData.backdrop_path}
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
              </div>
              <hr className="addmovie-hr" />
              <div className="form-wrapper-right">
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
                  Add To Database
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Add_Movie;
