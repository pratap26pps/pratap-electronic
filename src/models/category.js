import mongoose from "mongoose";

const categoryschemma=new mongoose.Schema({

    name:{
        type:String,  
        required:true,
    },
    description:{
        type:String,  
        required:true,
    },  
    Subcategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory"
    }],
});

const Category = mongoose.models.Category || mongoose.model("Category",categoryschemma);

export default Category;