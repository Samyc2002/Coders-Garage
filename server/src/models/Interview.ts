import { Document, model, Model, Schema } from "mongoose";

interface Scheme {

    RoomId: string,
    InterviewerEmail: string,
    IntervieweeEmail: string,
    Duration: number,
    StartTime: string,
    Questions: string[]
}

export type InterviewDocument = Scheme & Document;

const InterviewSchema: Schema = new Schema({

    RoomId: { type: String },
    InterviewerEmail: { type: String },
    IntervieweeEmail: { type: String },
    Duration: { type: Number },
    StartTime: { type: String },
    Questions: { type: [String] }
});

const Interview: Model<InterviewDocument> = model('Interview', InterviewSchema);
export default Interview;