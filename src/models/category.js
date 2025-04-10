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
    subcategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory"
    }],
},{ timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category",categoryschemma);

export default Category;