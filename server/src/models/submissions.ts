import { Document, model, Model, Schema } from 'mongoose';

interface Scheme{

    QuestionID: string,
    Creator: string,
    Code: string,
    Language: string,
    Status: string
}

export type SubmissionDocument = Scheme & Document;

const SubmissionSchema: Schema = new Schema({

    QuestionID: { type: String },
    Creator: { type: String },
    Code: { type: String },
    Language: { type: String },
    Status: { type: String }
});

const Submission: Model<Document> = model('Submission', SubmissionSchema);
export default Submission;