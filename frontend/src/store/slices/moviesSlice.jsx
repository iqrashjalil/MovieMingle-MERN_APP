import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../ServerUrl.jsx";

const initialState = {
  allMovies: [],
  recentMovie: null,
  requestMovie: null,
  movieDetails: null,
  tmdbMovieInfo: null,
  tmdbMovieCast: null,
  recommendations: null,
  moviesrequests: null,
  tmdbMoviesList: null,
  tmdbShowsList: null,
  trendingMovies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({
    year = "",
    rating = "",
    genre = "",
    search = "",
    page = 1,
    limit,
    type,
  } = {}) => {
    let url = `${serverUrl}/api/movie/getallmovies?page=${page}`;

    const params = new URLSearchParams();

    if (limit) {
      params.append("limit", limit);
    }
    if (year) {
      params.append("year", year);
    }
    if (type) {
      params.append("type", type);
    }
    if (rating) {
      params.append("rating", rating);
    }
    if (genre) {
      params.append("genre", genre);
    }
    if (search) {
      params.append("search", search);
    }
    url += `&${params.toString()}`;

    const { data } = await axios.get(url);
    return data;
  }
);

export const fetchRecentMovie = createAsyncThunk(
  "movies/fetchRecentMovie",
  async (limit = 1) => {
    let url = `${serverUrl}/api/movie/movies/recent`;
    if (limit) {
      url += `?limit=${limit}`;
    }
    const { data } = await axios.get(url);
    return data.recentMovies;
  }
);

export const postRequestMovie = createAsyncThunk(
  "movies/postRequestMovie",
  async (postData) => {
    const { data } = await axios.post(
      `${serverUrl}/api/movie/requestmovie`,
      postData
    );
    return data;
  }
);

export const movieDetail = createAsyncThunk(
  "movies/movieDetails",
  async (movieId) => {
    const { data } = await axios.get(
      `${serverUrl}/api/movie/getmovie/${movieId}`
    );
    return data.movie;
  }
);
export const recommendedMovies = createAsyncThunk(
  "movies/recommendedMovies",
  async (movieId) => {
    const { data } = await axios.get(
      `${serverUrl}/api/movie/recomendedmovies/${movieId}`
    );
    return data.recommendations;
  }
);

export const fetchRequestedMovies = createAsyncThunk(
  "movies/fetchRequestedMovies",
  async (limit = 1) => {
    let url = `${serverUrl}/api/movie/getallrequestmovies`;
    if (limit) {
      url += `?limit=${limit}`;
    }
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    return data;
  }
);

export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${serverUrl}/api/movie/addmovie`,
        movieData,
        config
      );

      return data;
    } catch (error) {
      console.error("Error occurred:", error);

      if (error.response && error.response.data) {
        if (error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(
            "An error occurred. Please check your movie data."
          );
        }
      } else {
        return rejectWithValue(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "movie/deleteRequest",
  async (id) => {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${serverUrl}/api/movie/deleterequest/${id}`,
      config
    );

    return data;
  }
);

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.delete(
    `${serverUrl}/api/movie/deletemovie/${id}`,
    config
  );

  return data;
});

export const editMovie = createAsyncThunk(
  "movie/editMovie",
  async ({ movieId, updatedData }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${serverUrl}/api/movie/updatemovie/${movieId}`,
        updatedData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const incrementDownload = createAsyncThunk(
  "movie/incrementDownload",
  async (movieId) => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${serverUrl}/api/movie/moviedownload/${movieId}`,
      config
    );
    return data;
  }
);

export const trendingMoviesList = createAsyncThunk(
  "movie/trendingMoviesList",
  async () => {
    const { data } = await axios.get(
      `${serverUrl}/api/movie/gettrendingmovies`
    );

    return data;
  }
);

export const fetchMoviesFromTMDB = createAsyncThunk(
  "movies/fetchMoviesFromTMDB",
  async (query) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=ea40221071160253ca46cfd1933ecd97&query=${query}`
    );
    return data;
  }
);

export const fetchShowsFromTMDB = createAsyncThunk(
  "movies/fetchShowsFromTMDB",
  async (query) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=ea40221071160253ca46cfd1933ecd97&query=${query}`
    );
    return data;
  }
);


const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearRequestMovie(state) {
      state.requestMovie = null;
    },
    clearMovieDetails(state) {
      state.movieDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = action.payload.movies;
        state.moviesCount = action.payload.totalMoviesCount;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecentMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.recentMovie = action.payload;
      })
      .addCase(fetchRecentMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postRequestMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRequestMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.requestMovie = action.payload;
      })
      .addCase(postRequestMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(movieDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(movieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(recommendedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recommendedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(recommendedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRequestedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesrequests = action.payload;
      })
      .addCase(fetchRequestedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Movie added successfully!";
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Movie Request Deleted Successfully";
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Movie Deleted Successfully";
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Movie Updated Successfully";
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Increament Download
      .addCase(incrementDownload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(incrementDownload.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(incrementDownload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Trending Movies
      .addCase(trendingMoviesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trendingMoviesList.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload.trendingMovies;
      })
      .addCase(trendingMoviesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Fetch Movies From TMDB API
      .addCase(fetchMoviesFromTMDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesFromTMDB.fulfilled, (state, action) => {
        state.loading = false;
        state.tmdbMoviesList = action.payload.results;
      })
      .addCase(fetchMoviesFromTMDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //* Fetch Shows From TMDB API
      .addCase(fetchShowsFromTMDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowsFromTMDB.fulfilled, (state, action) => {
        state.loading = false;
        state.tmdbShowsList = action.payload.results;
      })
      .addCase(fetchShowsFromTMDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearRequestMovie, clearMovieDetails } =
  moviesSlice.actions;
export default moviesSlice.reducer;
