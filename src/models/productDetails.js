import mongoose from "mongoose";

const productDetailsSchema= new mongoose.Schema({
    ProductTitle:{
        required:true,
        type:String
    },
    ProductShortDescription:{
        required:true,
        type:String
    },
    ProductPrice:{
        required:true,
        type:Number
    },
    productItems:{
        required:true,
        type:Number
    },
    ProductImage:{
        required:true,
        type:String
    },
    BenefitsOfProduct:{
        required:true,
        type:String
    },
    brandcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BrandProduct",
        required: true,
      },
      
      isFeatured: {
        type: Boolean,
        default: false,
      },
      views: {
        type: Number,
        default: 0,
      },
      purchases: {
        type: Number,
        default: 0,
      },
   
},{
    timestamps: true, 
  });

const Product = mongoose.models.Product || mongoose.model("Product",productDetailsSchema);

export default Product;