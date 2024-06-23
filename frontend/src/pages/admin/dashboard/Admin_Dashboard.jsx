import React, { useEffect } from "react";
import Admin_Sidebar from "../sidebar/Admin_Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader.jsx";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import "./dashboard.css";
import {
  fetchMovies,
  fetchRecentMovie,
  fetchRequestedMovies,
} from "../../../store/slices/moviesSlice.jsx";
import { getUsers } from "../../../store/slices/userSlice.jsx";
import { useNavigate } from "react-router-dom";
const Admin_Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, totalUsers } = useSelector((state) => state.user);
  const { recentMovie, moviesCount, moviesrequests } = useSelector(
    (state) => state.movies
  );
  useEffect(() => {
    dispatch(fetchRecentMovie(20));
    dispatch(fetchMovies({}));
    dispatch(fetchRequestedMovies(5));
  }, [dispatch]);

  useEffect(() => {
    if (!totalUsers && !loading) {
      dispatch(getUsers());
    }
  }, [dispatch, totalUsers, loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="dashboad-section">
          <div className="admin-sidebar-section">
            <Admin_Sidebar />
          </div>
          <div className="admin-dashboard-section">
            <div className="movie-statistics">
              <div onClick={() => navigate("/admin/viewallmovies")}>
                <AiFillProduct className="movie-statistics-icon" />
                <h2>Movies</h2>
                <p>
                  Total <span>{moviesCount && moviesCount}</span> Movies
                </p>
              </div>
              <div>
                <FaUsers className="movie-statistics-icon skyblue" />
                <h2>Admins</h2>
                <p>
                  Total{" "}
                  <span className="skyblue">
                    {totalUsers && totalUsers.length}
                  </span>{" "}
                  {totalUsers && totalUsers.length == 1 ? "Admin" : "Admins"}
                </p>
              </div>
              <div onClick={() => navigate("/admin/viewallrequests")}>
                <MdMovie className="movie-statistics-icon violet" />
                <h2>Movie Requests</h2>
                <p>
                  Total{" "}
                  <span className="violet">
                    {moviesrequests && moviesrequests.totalMoviesCount}
                  </span>{" "}
                  Movies Requests
                </p>
              </div>
            </div>
            <div className="movies-users">
              <div className="movies-users-all">
                <h3 className="recent-movies-heading aliceblue">
                  Recently Added Movies
                </h3>
                <div className="recent-movies-admin">
                  <ul>
                    {recentMovie &&
                      recentMovie.map((movie, index) => (
                        <li key={index}>
                          <img
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                            alt=""
                          />
                          <h6>{movie.title}</h6>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="movies-users-all">
                <h3 className="recent-movies-heading aliceblue">
                  Latest Movie Requests
                </h3>
                <div className="recent-movies-admin">
                  <ul>
                    {moviesrequests &&
                      moviesrequests.requestedMovies.map((movie, index) => (
                        <li key={index}>
                          <h6>{movie.movieName}</h6>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Admin_Dashboard;
