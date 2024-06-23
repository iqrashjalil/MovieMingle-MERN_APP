import React, { useEffect } from "react";
import "./all_movies.css";
import Admin_Sidebar from "../sidebar/Admin_Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import {
  deleteRequest,
  fetchRecentMovie,
  fetchRequestedMovies,
} from "../../../store/slices/moviesSlice";
import { toast } from "react-toastify";

const formatDate = (requestedAt) => {
  const date = new Date(requestedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const All_Requests = () => {
  const dispatch = useDispatch();
  const { moviesrequests, loading, message } = useSelector(
    (state) => state.movies
  );

  const handleFullfilled = (id) => {
    dispatch(deleteRequest(id)).then(() => {
      dispatch(fetchRequestedMovies(20));
    });
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    dispatch(fetchRequestedMovies(20));
  }, [dispatch, message]);

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
            <div className="table-container">
              <table className="movie-table">
                <thead>
                  <tr>
                    <th>Requested Movie</th>
                    <th>Requested By</th>
                    <th>Requested At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {moviesrequests &&
                    moviesrequests.requestedMovies.map((movie, index) => (
                      <tr key={index}>
                        <td className="center">{movie.movieName}</td>
                        <td className="center">{movie.requestedBy}</td>
                        <td className="center">
                          {formatDate(movie.requestedAt)}
                        </td>
                        <td className="center">
                          <button
                            onClick={() => handleFullfilled(movie._id)}
                            className="action-btn fullfilled"
                          >
                            Fulfilled
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

export default All_Requests;
