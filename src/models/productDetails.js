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

});

const Product = mongoose.models.Product || mongoose.model("Product",productDetailsSchema);

export default Product;