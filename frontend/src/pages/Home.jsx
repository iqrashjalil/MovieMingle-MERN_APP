import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import "./home.css";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import Card from "../components/card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchMovies,
  fetchRecentMovie,
  trendingMoviesList,
} from "../store/slices/moviesSlice.jsx";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader.jsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
const Home = () => {
  const carouselRef = useRef(null);

  const carouselRefTrending = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollleftTrending = () => {
    carouselRefTrending.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRightTrending = () => {
    carouselRefTrending.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const { recentMovie, trendingMovies, error, loading, allMovies } =
    useSelector((state) => state.movies);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    const params = new URLSearchParams(location.search);
    const year = params.get("year");
    const rating = params.get("rating");

    if (!year && !rating) {
      dispatch(fetchMovies({ limit: 18 }));
    }
    dispatch(fetchRecentMovie(20));
    dispatch(trendingMoviesList());
  }, [location.search, error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <div class="alert alert-primary" role="alert">
            <h4 class="alert-heading">Information!</h4>
            <p>
              For Admin Actions use the following infront of the url <br /> like
              (http://moviemingle.onrender.com/admin/signin) <br />{" "}
              ("/admin/signin") for admin login <br /> ("/admin/register") for
              admin registration <br /> ("/admin/dashboard") for admin dashboard
              )
            </p>
            <hr />

            <p class="mb-0">
              admin panel login credentials (Email: test@gmail.com | Password:
              test@1)
            </p>
          </div> */}

          <section className="home-section">
            <Sidebar />
            <div className="home-container">
              <div className="wrapper">
                <div className="wrapper-heading">
                  <h4>Recent Added</h4>
                </div>
                <i id="left" onClick={scrollLeft}>
                  <FaAngleLeft />
                </i>

                <div className="carousel" ref={carouselRef}>
                  {recentMovie &&
                    recentMovie.map((movie, index) => (
                      <div key={index}>
                        <Card movie={movie.id} data={movie} />
                      </div>
                    ))}
                </div>
                <i id="right" onClick={scrollRight}>
                  <FaAngleRight />
                </i>
              </div>
              <div className="wrapper">
                <div className="wrapper-heading">
                  <h4>All Movies</h4>
                  <NavLink className="view-more-btn" to={"/all/movies"}>
                    View More
                  </NavLink>
                </div>
                <div className="all-movies-home">
                  {allMovies &&
                    allMovies.map((movie, index) => (
                      <div key={index}>
                        <Card data={movie} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="wrapper">
                <div className="wrapper-heading">
                  <h4>Trending Movies</h4>
                </div>
                <i id="left" onClick={scrollleftTrending}>
                  <FaAngleLeft />
                </i>
                <div className="carousel" ref={carouselRefTrending}>
                  {trendingMovies &&
                    trendingMovies.map((movie, index) => (
                      <div key={index}>
                        <Card movie={movie.id} data={movie} />
                      </div>
                    ))}
                </div>
                <i id="right" onClick={scrollRightTrending}>
                  <FaAngleRight />
                </i>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
