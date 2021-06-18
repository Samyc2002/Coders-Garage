import { Document, model, Model, Schema } from "mongoose";

interface schema {
    UserName: string,
}

export type UserDocument = schema & Document;

const UserSchema: Schema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
});

const User: Model<UserDocument> = model('User', UserSchema);
export default User;