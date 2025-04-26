import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const News = mongoose.models.News || mongoose.model("News", newsSchema);
