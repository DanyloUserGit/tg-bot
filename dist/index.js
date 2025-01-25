"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.bot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const texts_1 = require("./types/texts");
const ui_1 = require("./ui");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("./http");
exports.bot = new node_telegram_bot_api_1.default(process.env.TOKEN, { polling: true });
exports.db = mongoose_1.default.createConnection(process.env.MONGO_LINK);
console.log(exports.db);
const questionService = new http_1.QuestionService();
exports.bot.on("message", (msg) => {
    const lang = msg.from.language_code;
    const chatId = msg.chat.id;
    if (msg.text === "/start") {
        const startKeyboard = (0, ui_1.createInlineKeyboard)([
            { text: texts_1.startButtons[lang].ask, callback_data: "ask" },
            { text: texts_1.startButtons[lang].answer, callback_data: "answer" }
        ]);
        exports.bot.sendMessage(chatId, texts_1.startMessage[lang], startKeyboard);
    }
});
exports.bot.on("callback_query", (query) => __awaiter(void 0, void 0, void 0, function* () {
    const action = query.data;
    const msg = query.message;
    const lang = query.from.language_code;
    switch (action) {
        case "answer":
            exports.bot.editMessageText(texts_1.answersDefaultText[lang], { chat_id: msg.chat.id, message_id: msg.message_id });
            const question = yield questionService.getQuestionByRegion(lang, msg.chat.id);
            console.log(question);
            break;
        case 'ask':
            exports.bot.editMessageText(texts_1.questionsDefaultText[lang], { chat_id: msg.chat.id, message_id: msg.message_id });
            exports.bot.on('message', (msg) => {
                questionService.addQuestion({
                    lang,
                    user_id: msg.from.id,
                    text: msg.text
                }, msg.chat.id);
            });
            break;
        default:
            break;
    }
}));
//# sourceMappingURL=index.js.map