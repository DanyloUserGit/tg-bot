import mongoose, { Schema } from "mongoose";
// import { db } from "..";
const db = mongoose.createConnection(process.env.MONGO_LINK);
export const QuestionSchema = new Schema({
    user_id: Number,
    text: String,
    lang: {type: String, default: 'en'},
    in_progress: {type: Boolean, default:false},
    closed: {type: Boolean, default:false},
})

export const QuestionModel = db.model("QuestionModel", QuestionSchema);
exports.QuestionSchema = QuestionSchema;
exports.QuestionModel = db.model('QuestionModel', QuestionSchema);