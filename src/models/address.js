    import mongoose from "mongoose";
    const addressSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }, { timestamps: true });

    const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

    export default Address;
