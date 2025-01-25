"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInlineKeyboard = void 0;
const createInlineKeyboard = (keyboard) => {
    return {
        reply_markup: {
            inline_keyboard: [
                keyboard
            ]
        }
    };
};
exports.createInlineKeyboard = createInlineKeyboard;
//# sourceMappingURL=index.js.map