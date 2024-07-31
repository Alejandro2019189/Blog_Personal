import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, status, ...rest} = this.toObject();
    rest.uid = _id;
    return rest;
}

export default mongoose.model('User', UserSchema);