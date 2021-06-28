import { Document, model, Model, Schema } from "mongoose";

interface Scheme {

    UserName: string,
    Image: string,
    Password: string,
    Email: string,
    Name: string,
    Institute: string,
    Country: string,
    State: string,
    City: string,
    questionsCreated: string[],
    questionsSolved: string[]
}

export type UserDocument = Scheme & Document;

const UserSchema: Schema = new Schema({

    UserName: {
        type: String,
        default: ""
    },
    Image: {
        type: String,
        default: ""
    },
    Password: {
        type: String,
        default: ""
    },
    Email: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        default: ""
    },
    Institute: {
        type: String,
        default: ""
    },
    Country: {
        type: String,
        default: ""
    },
    State: {
        type: String,
        default: ""
    },
    City: {
        type: String,
        default: ""
    },
    questionsCreated: {
        type: [String],
        default: [""]
    },
    questionsSolved: {
        type: [String],
        default: [""]
    }
});

const User: Model<UserDocument> = model('User', UserSchema);
export default User;