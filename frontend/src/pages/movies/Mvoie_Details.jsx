import React, { useEffect, useRef, useState } from "react";
import poster from "../../images/new.webp";
import Sidebar from "../../components/sidebar/Sidebar";
import "./movie_detail.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import {
  clearError,
  clearMovieDetails,
  incrementDownload,
  movieDetail,
  recommendedMovies,
} from "../../store/slices/moviesSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.jsx";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import Card from "../../components/card/Card.jsx";
import {} from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Mvoie_Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, recommendations, loading, error } = useSelector(
    (state) => state.movies
  );

  const handleDownload = (e, id) => {
    e.preventDefault();
    dispatch(incrementDownload(id));
    window.location.href = `${movieDetails?.download_link}`;
  };

  useEffect(() => {
    dispatch(clearMovieDetails());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(movieDetail(id));
    dispatch(recommendedMovies(id));
  }, [dispatch, error, id]);
  const genreNames = movieDetails?.genres?.map((genre) => genre);
  console.log(genreNames);
  const votes = movieDetails?.vote_average;

  const backdropUrl = movieDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movieDetails?.backdrop_path}`
    : null;

  const sectionStyle = backdropUrl
    ? { "--backdrop-url": `url(${backdropUrl})` }
    : {};

  //* Fetching the cast of the movie or web series

  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="movie-detail-section" style={sectionStyle}>
            <Sidebar />

            <div className="main">
              <div className="movie-details-section-right">
                <div className="movie-detail-left">
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movieDetails?.poster_path}`}
                    alt=""
                  />
                </div>

                <div className="movie-detail-right">
                  <h2>
                    {movieDetails &&
                      (movieDetails.title ? movieDetails.title : "Movie Title")}
                  </h2>
                  <div className="movie-genres">
                    {genreNames &&
                      genreNames.map((genre, index) => (
                        <span className="genre-span" key={index}>
                          {genre}
                        </span>
                      ))}
                  </div>
                  <div className="ratings">
                    {" "}
                    <CircularProgressbar
                      value={votes}
                      maxValue={10}
                      strokeWidth={8}
                      text={`${votes}`}
                      styles={buildStyles({
                        textShadow: "0 0 2px #000",

                        textWeight: "700 !important",
                        fontWeight: "900 !important",
                        textColor: "#fff",
                        pathColor: "#00FF00",
                        trailColor: "black",
                      })}
                    />
                    <NavLink to={`${movieDetails?.trailer}`}>
                      <FaRegCirclePlay className="trailer-play-btn" />
                      <h4>Watch Trailer</h4>
                    </NavLink>
                  </div>

                  {movieDetails && movieDetails.overview != "" && (
                    <div className="overview">
                      <h4>Overview</h4>
                      <p>{movieDetails.overview}</p>
                    </div>
                  )}
                  <hr className="movie-details-hr" />

                  {movieDetails && (
                    <div className="about-movie">
                      <div>
                        <h6>Language:</h6>
                        <p>{movieDetails.language}</p>
                      </div>
                      <div>
                        <h6>Video Quality:</h6>
                        <p>{movieDetails.video_quality}</p>
                      </div>
                    </div>
                  )}
                  <hr className="movie-details-hr" />
                </div>
              </div>
              <div className="recommended-videos">
                <div className="wrapper">
                  <div className="wrapper-heading">
                    <h4>Download Links </h4>
                  </div>
                  <div className="download-link">
                    <div className="quality-type">
                      <MdCloudUpload className="download-icons " />
                      <h6>Terabox Link</h6>
                    </div>
                    <button
                      className="download-btn"
                      onClick={(e) => handleDownload(e, id)}
                    >
                      Download {movieDetails?.video_quality}
                    </button>
                  </div>
                </div>
              </div>

              <div className="recommended-videos">
                <div className="wrapper">
                  <div className="wrapper-heading">
                    <h4>You May Like</h4>
                  </div>
                  <i id="left" onClick={scrollLeft}>
                    <FaAngleLeft />
                  </i>
                  <div className="carousel" ref={carouselRef}>
                    {recommendations &&
                      recommendations.map((movie, index) => (
                        <div key={index}>
                          <Card movie={movie.id} data={movie} />
                        </div>
                      ))}
                  </div>
                  <i id="right" onClick={scrollRight}>
                    <FaAngleRight />
                  </i>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Mvoie_Details;
