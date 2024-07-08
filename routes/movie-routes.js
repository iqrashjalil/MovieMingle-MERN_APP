import express from "express";
import movieController from "../controllers/movie-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import requestMovieController from "../controllers/requestMovie-controller.js";
const router = express.Router();

//* Admin Routes
router.route("/addmovie").post(authMiddleware, movieController.addMovie);
router
  .route("/updatemovie/:id")
  .put(authMiddleware, movieController.updateMovie);
router
  .route("/deletemovie/:id")
  .delete(authMiddleware, movieController.deleteMovie);
router
  .route("/getadminmovies")
  .get(authMiddleware, movieController.getAdminMovies);
router
  .route("/getallrequestmovies")
  .get(authMiddleware, requestMovieController.getAllRequestedMovies);
router
  .route("/deleterequest/:id")
  .delete(authMiddleware, requestMovieController.deleteRequest);

//* User Routes
router.route("/getallmovies").get(movieController.getAllMovies);
router.route("/getmovie/:id").get(movieController.getSingleMovie);
router.route("/requestmovie").post(requestMovieController.requestMovie);
router.route("/moviedownload/:id").post(movieController.increaseDownloads);
router.route("/gettrendingmovies").get(movieController.getTrendingMovies);
router.route("/recomendedmovies/:id").get(movieController.getRecommendations);
router.route("/movies/recent").get(movieController.getRecentMovies);

export default router;
