import mongoose from "mongoose"; 

 
const Subcategoryschemma=new mongoose.Schema({

   name:{
        type:String,
    },
    description:{
        type:String,  
        required:true,
    }, 
   brandProduct:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"BrandProduct"
   }],
   category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category"
   }

})

const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory",Subcategoryschemma);

export default Subcategory;