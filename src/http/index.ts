import { bot } from "..";
import { answersLimitText, notQuestion, successAdd } from "../types/texts";
import { AddQuestion, Question } from "../types/types";
import { QuestionModel } from "./questionSchema";

export class QuestionService {
    constructor () {
    }
    
    async getQuestionByRegion(reg: string, chatId:number){
        try {
            const question:Question = await QuestionModel.findOne({lang: reg, in_progress:false, closed: false});
            if(!question){
                bot.sendMessage(chatId, answersLimitText[reg]);
                throw new Error("Nothing was found");
            }
            return question;
        } catch (error) {
            throw error;
        }
    }

    async addQuestion(body: AddQuestion, chatId:number){
        try {
            if(!body.text.endsWith("?")){
                bot.sendMessage(chatId, notQuestion[body.lang]);
                throw new Error("Is not a question")
            }
            const question = await QuestionModel.create({...body});
            bot.sendMessage(chatId, successAdd[body.lang]);
            return question;
        } catch (error) {
            throw error;
        }
    }
}