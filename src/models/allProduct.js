import mongoose from "mongoose";
const allproductschemma=new mongoose.Schema({
 
    productcontent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"        
    }],
   ratingreview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ratrev"    
    }],
    customerPurchased:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],

    status:{
        type:String,
        enum:["draft","published"],
    },
});
 
const Allproduct= mongoose.models.Allproduct || mongoose.model("Allproduct",allproductschemma);

export default Allproduct;