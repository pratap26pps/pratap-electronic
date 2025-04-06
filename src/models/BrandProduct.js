import mongoose from "mongoose"; 
 
const BrandProductschemma=new mongoose.Schema({
   BrandName:{
        type:String,
    },
    description:{
      type:String,
  },
   product:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
   }]
   
})

const BrandProduct = mongoose.models.BrandProduct || mongoose.model("BrandProduct",BrandProductschemma);

export default BrandProduct;