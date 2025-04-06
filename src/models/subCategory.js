import mongoose from "mongoose"; 
 
const Subcategoryschemma=new mongoose.Schema({

   SubCatName:{
        type:String,
    },
    description:{
        type:String,  
        required:true,
    }, 
   BrandProduct:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"BrandProduct"
   }]
   
   
})

const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory",Subcategoryschemma);

export default Subcategory;