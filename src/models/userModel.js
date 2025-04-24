import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
       required:true,
       type:String
    },
    lastname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },password:{
        required:true,
        type:String
    }, 
    phonenumber:{
        required:true,
        type:Number
    },state:{
        required:true,
        type:String
    },
      country:{
        required:true,
        type:String
      } ,city:{
        required:true,
        type:String
      },  
      isVarified:{
        type:Boolean,
        default:false
      },
      role: {
        type: String,
        enum: ["customer", "owner"],
        default: "customer",
      },
       product: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        ],
      forgotpasswordToken:String,
      verifypasswordTokenExpiry:Date,
      verifyTokenExpiry:Date,
      verifyToken:String,
     

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;