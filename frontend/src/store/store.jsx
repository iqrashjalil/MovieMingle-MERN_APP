import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slices/moviesSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice,
    user: userSlice,
  },
});

export default store;
