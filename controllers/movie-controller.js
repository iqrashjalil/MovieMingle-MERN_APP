import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Movie from "../models/movie-model.js";
import { ErrorHandler } from "../utils/error-handler.js";

//* Add new Movie -- Admin

const addMovie = catchAsyncError(async (req, res, next) => {
  const {
    title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
    genres,
    vote_average,
    type,
    trailer,
    language,
    video_quality,
    download_link,
    id: tmdb_id,
  } = req.body;
  const movieExist = await Movie.findOne({ tmdb_id });
  if (movieExist) {
    return next(new ErrorHandler("Movie Already Exist", 400));
  }

  const newMovie = new Movie({
    title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
    genres,
    vote_average,
    tmdb_id,
    type,
    trailer,
    language,
    video_quality,
    download_link,
    postedBy: req.user._id,
  });

  await newMovie.save();

  res.status(201).json({
    success: true,
    message: "Movie Added Successfully",
  });
});

//* Get All Movies -- User
const getAllMovies = catchAsyncError(async (req, res, next) => {
  const { search, genre, year, rating, type, page = 1, limit = 54 } = req.query;
  const totalMoviesCount = await Movie.countDocuments();

  let query = {};

  if (search) {
    query = {
      ...query,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { overview: { $regex: search, $options: "i" } },
      ],
    };
  }

  if (genre) {
    query["genres"] = genre;
  }
  if (type) {
    query["type"] = type;
  }
  if (year) {
    query.release_date = { $regex: `^${year}`, $options: "i" };
  }

  if (rating) {
    query.vote_average = {
      $gte: parseFloat(rating),
      $lt: parseFloat(rating) + 1,
    };
  }

  const movies = await Movie.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalMovies = await Movie.countDocuments(query);

  const totalPages = Math.ceil(totalMovies / limit);

  res.status(200).json({
    success: true,
    movies,
    totalMoviesCount,
    pagination: {
      totalMovies,
      currentPage: parseInt(page),
      totalPages,
    },
  });
});

//* Get Single Movie -- User

const getSingleMovie = catchAsyncError(async (req, res, next) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);
  res.status(200).json({
    success: true,
    movie,
  });
});

//* Update Movie -- Admin

const updateMovie = catchAsyncError(async (req, res, next) => {
  const movieId = req.params.id;
  const updatedFields = req.body;
  let movie = await Movie.findById(movieId);
  if (!movie) {
    return next(new ErrorHandler(`Movie With Id ${movieId} Not Found`, 404));
  }
  movie = await Movie.findByIdAndUpdate(movieId, updatedFields, {
    new: true,
  });
  res.status(200).json({
    success: true,
    message: "Movie Updated Successfully",
    movie,
  });
});

//* Delete Movie -- Admin

const deleteMovie = catchAsyncError(async (req, res, next) => {
  const movieId = req.params.id;
  let movie = await Movie.findById(movieId);
  if (!movie) {
    return next(new ErrorHandler(`Movie With Id ${movieId} Not Found`, 404));
  }
  movie = await Movie.findByIdAndDelete(movieId);
  res.status(200).json({
    success: true,
    message: `${movie.title} deleted successfully`,
  });
});

const getAdminMovies = catchAsyncError(async (req, res, next) => {
  const movies = await Movie.find();
  res.status(200).json({
    success: true,
    movies,
  });
});

//* Add 1 in movie downlaods

const increaseDownloads = catchAsyncError(async (req, res, next) => {
  const movieId = req.params.id;

  // Find the movie by ID
  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  // Increment the downloads by 1
  movie.downloads += 1;

  // Save the updated movie to the database
  await movie.save();

  res.status(200).json({
    success: true,
    message: "Downloads incremented successfully",
  });
});

//* Get Trending Movies
const getTrendingMovies = catchAsyncError(async (req, res, next) => {
  // Query for trending movies sorted by downloads
  const trendingMovies = await Movie.find()
    .sort({ downloads: -1 }) // Sort by descending downloads
    .limit(20); // Limit the result to the top 10 movies with the highest number of downloads

  res.status(200).json({
    success: true,
    trendingMovies,
  });
});
//* Get Recomended Movies
const getRecommendations = catchAsyncError(async (req, res, next) => {
  const movieId = req.params.id;

  // Find the movie by ID
  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  // Get the genres of the selected movie
  const genres = movie.genres;

  // Find other movies with at least one matching genre, excluding the original movie
  const recommendations = await Movie.find({
    _id: { $ne: movieId },
    genres: { $in: genres }, // Look for movies with at least one matching genre
  }).limit(10);

  res.status(200).json({
    success: true,
    recommendations,
  });
});

//* Get Recently Added Movies

const getRecentMovies = catchAsyncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 6;

  const recentMovies = await Movie.find().sort({ createdAt: -1 }).limit(limit);

  res.status(200).json({
    success: true,
    recentMovies,
  });
});
export default {
  addMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
  deleteMovie,
  getAdminMovies,
  increaseDownloads,
  getTrendingMovies,
  getRecommendations,
  getRecentMovies,
};
