import React from "react";
import "./card.css";
import { IoMdDownload } from "react-icons/io";
import { NavLink } from "react-router-dom";
const Card = ({ data }) => {
  return (
    <NavLink to={`/movie/detail/${data._id}`} className="card">
      <img
        src={`https://image.tmdb.org/t/p/w780${data?.poster_path}`}
        alt="Slide"
        draggable="false"
      />
      <div className="gradient-overlay"></div>
      <h2 className="card-title">{data.title}</h2>
      <IoMdDownload className="card-download-icon" />
    </NavLink>
  );
};

export default Card;
