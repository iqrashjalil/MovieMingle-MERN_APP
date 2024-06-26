import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import "./allmovies.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchMovies } from "../../store/slices/moviesSlice";
import Card from "../../components/card/Card";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Only_Movies = () => {
  const dispatch = useDispatch();

  const { allMovies, error, loading, totalPages } = useSelector(
    (state) => state.movies
  );

  const [page, setPage] = useState(0);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(fetchMovies({ type: "Movie", page: page + 1 }));
  }, [dispatch, error, page]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="all-movies-section">
          <Sidebar />
          <div className="home-container">
            <div className="wrapper">
              <div className="wrapper-heading">
                <h4>All Movies</h4>
              </div>
              <div className="all-movies-home">
                {allMovies &&
                  allMovies.map((movie, index) => (
                    <div key={index}>
                      <Card data={movie} />
                    </div>
                  ))}
              </div>
              {totalPages && totalPages > 1 ? (
                <div className="pagination-box">
                  <ReactPaginate
                    previousLabel={<MdArrowBackIos />}
                    nextLabel={<MdArrowForwardIos />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    forcePage={page}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Only_Movies;
