import React, { useEffect, useState } from "react";
import "./all_movies.css";
import Admin_Sidebar from "../sidebar/Admin_Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { deleteMovie, fetchMovies } from "../../../store/slices/moviesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Admin_All_Movies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allMovies, loading, message } = useSelector((state) => state.movies);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteMovie = (id) => {
    dispatch(deleteMovie(id)).then(() => {
      dispatch(fetchMovies({}));
    });
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(fetchMovies({ search: searchQuery }));
  };
  useEffect(() => {
    dispatch(fetchMovies({}));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="allmovies-section">
          <div className="allmovies-section-left">
            <Admin_Sidebar />
          </div>
          <div className="allmovies-section-right">
            <div className="movies-search">
              <div className="input allmovies-input">
                <label htmlFor="movieSearch">Search Movie</label>
                <input
                  className="search-bar"
                  type="search"
                  name="movieSearch"
                  id="movieSearch"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <button className="search-button" onClick={handleSearchSubmit}>
                <FaSearch className="admin-search-icon" />
              </button>
            </div>
            <div className="table-container">
              <table className="movie-table">
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Movie Name</th>
                    <th>Downloads</th>
                    <th>Language</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allMovies &&
                    allMovies.map((movie, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="table-img"
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                            alt=""
                          />
                        </td>
                        <td>{movie.title}</td>
                        <td className="center">
                          <span className="badge text-bg-light">
                            {movie.downloads}
                          </span>
                        </td>
                        <td className="center">{movie.language}</td>
                        <td className="center">
                          <button
                            onClick={() =>
                              navigate(`/admin/editmovie/${movie._id}`)
                            }
                            className="action-btn edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMovie(movie._id)}
                            className="action-btn delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Admin_All_Movies;
