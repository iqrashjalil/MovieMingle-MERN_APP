import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import RequestMovie from "../models/requestMovie-model.js";

const requestMovie = catchAsyncError(async (req, res, next) => {
  const { movieName, requestedBy } = req.body;
  const movieRequest = await RequestMovie.create({
    movieName,
    requestedBy,
  });

  res.status(200).json({
    success: true,
    message: "Movie Requested Successfully",
    movieRequest,
  });
});

const getAllRequestedMovies = catchAsyncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const totalMoviesCount = await RequestMovie.countDocuments();
  const requestedMovies = await RequestMovie.find().limit(limit);
  res.status(200).json({
    success: true,
    totalMoviesCount,
    requestedMovies,
  });
});

const deleteRequest = async (req, res, next) => {
  const { id } = req.params;
  let movie = await RequestMovie.findById(id);
  if (!movie) {
    return next(new ErrorHandler(`Movie With Id ${id} Not Found`, 404));
  }
  movie = await RequestMovie.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: `${movie.movieName} deleted successfully`,
  });
};

export default { requestMovie, deleteRequest, getAllRequestedMovies };
