import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie Title is required"],
      minLength: [2, "Movie Name Cannot Be Less Than 2 Characters"],
    },
    overview: {
      type: String,
      required: [true, "Movie Overview is required"],
    },
    release_date: {
      type: String,
      required: [true, "Movie Release Date is required"],
    },
    poster_path: {
      type: String,
      required: [true, "Movie Poster Link is required"],
    },
    backdrop_path: {
      type: String,
      required: [true, "Movie Backdrop image Link is required"],
    },

    genres: [
      {
        type: String,
      },
    ],
    vote_average: {
      type: Number,
      required: [true, "Movie Votes is required"],
    },
    downloads: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["Movie", "Show"],
      required: [true, "Movie Type is required"],
    },
    trailer: {
      type: String,
      required: [true, "Movie Trailer Link is required"],
    },
    language: {
      type: String,
      required: [true, "Movie Language is required"],
    },
    video_quality: {
      type: String,
      required: [true, "Movie Video Quality is required"],
    },
    download_link: {
      type: String,
      required: [true, "Movie Download Link is required"],
    },
    tmdb_id: {
      type: Number,
      required: [true, "Movie tmdb ID is required"],
      unique: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
