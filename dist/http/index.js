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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const __1 = require("..");
const texts_1 = require("../types/texts");
const questionSchema_1 = require("./questionSchema");
class QuestionService {
    constructor() {
    }
    getQuestionByRegion(reg, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield questionSchema_1.QuestionModel.findOne({ lang: reg, in_progress: false, closed: false });
                if (!question) {
                    __1.bot.sendMessage(chatId, texts_1.answersLimitText[reg]);
                    throw new Error("Nothing was found");
                }
                return question;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addQuestion(body, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!body.text.endsWith("?")) {
                    __1.bot.sendMessage(chatId, texts_1.notQuestion[body.lang]);
                    throw new Error("Is not a question");
                }
                const question = yield questionSchema_1.QuestionModel.create(Object.assign({}, body));
                __1.bot.sendMessage(chatId, texts_1.successAdd[body.lang]);
                return question;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=index.js.map