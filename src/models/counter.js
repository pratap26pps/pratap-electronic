import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // like "Product"
  count: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

export default Counter;
