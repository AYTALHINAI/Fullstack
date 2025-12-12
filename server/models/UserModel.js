import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    uname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilepic: {
        type: String,
        required: false,
        default: "https://icon-library.com/images/profiles-icon/profiles-icon-0.jpg"
    },
    phoneNumber: { type: String, required: true },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;