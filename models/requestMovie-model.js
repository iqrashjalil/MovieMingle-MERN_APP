import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: [true, "Movie Name is Required"],
  },
  requestedBy: {
    type: String,
    required: [true, "Name is Required"],
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

const RequestMovie = mongoose.model("RequestMovie", requestSchema);

export default RequestMovie;
