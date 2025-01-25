import TelegramBot from "node-telegram-bot-api";
import { answersDefaultText, questionsDefaultText, startButtons, startMessage } from "./types/texts";
import { createInlineKeyboard } from "./ui";
import mongoose from "mongoose";
import { QuestionService } from "./http";

export const bot = new TelegramBot(process.env.TOKEN, {polling:true});
export const db = mongoose.createConnection(process.env.MONGO_LINK);
console.log(db)
const questionService = new QuestionService();

bot.on("message", (msg)=>{
    const lang = msg.from.language_code;
    const chatId = msg.chat.id;

    if(msg.text==="/start"){
        const startKeyboard = createInlineKeyboard([
            {text: startButtons[lang].ask, callback_data:"ask"},
            {text: startButtons[lang].answer, callback_data:"answer"}
        ]);
        bot.sendMessage(chatId, startMessage[lang], startKeyboard)
    }
})

bot.on("callback_query", async (query)=>{
    const action = query.data;
    const msg = query.message;
    const lang = query.from.language_code;

    switch (action) {
        case "answer":
            bot.editMessageText(answersDefaultText[lang], {chat_id: msg.chat.id, message_id: msg.message_id});
            const question = await questionService.getQuestionByRegion(lang, msg.chat.id);
            console.log(question)
            break;
        case 'ask':
            bot.editMessageText(questionsDefaultText[lang], {chat_id: msg.chat.id, message_id: msg.message_id});
            bot.on('message', (msg)=>{
                questionService.addQuestion({
                    lang,
                    user_id:msg.from.id,
                    text:msg.text
                }, msg.chat.id)
            })
            break;
        default:
            break;
    }
})