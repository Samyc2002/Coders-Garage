import { Document, model, Model, Schema } from "mongoose";

interface TC{

    Input: string,
    Output: string
}

interface Scheme {

    QuestionID: string,
    ProblemStatement: string,
    Input: string,
    Output: string,
    Constraints: string,
    SampleInput: string,
    SampleOutput: string,
    Explanation: string,
    Creator: string,
    Tags: string[],
    TimeLimit: string,
    MemoryLimit: number,
    TestCases: TC[]
}

export type QuestionDocument = Scheme & Document;

const QuestionSchema: Schema = new Schema({

    QuestionID: {
        type: String,
        required: true
    },
    ProblemStatement: {
        type: String,
        required: true
    },
    Input: {
        type: String,
        required: true
    },
    Output: {
        type: String,
        required: true
    },
    Constraints: {
        type: String,
        required: true
    },
    SampleInput: {
        type: String,
        required: true
    },
    SampleOutput: {
        type: String,
        required: true
    },
    Explanation: {
        type: String
    },
    Creator: {
        type: String,
        required: true
    },
    Tags: {
        type: [String]
    },
    TimeLimit: {
        type: String
    },
    MemoryLimit: {
        type: Number
    },
    TestCases: {
        type: [
            {
                Input: String,
                Output: String
            }
        ]
    }
});

const Question: Model<Document> = model('Question', QuestionSchema);
export default Question;