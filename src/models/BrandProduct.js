import mongoose from "mongoose";

const BrandProductschemma = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const BrandProduct =
  mongoose.models.BrandProduct ||
  mongoose.model("BrandProduct", BrandProductschemma);

export default BrandProduct;
