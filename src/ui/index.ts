import { Button } from "../types/types";

export const createInlineKeyboard = (keyboard: Button[]) => {
    return {
        reply_markup: {
          inline_keyboard: [
            keyboard
          ]
        }
    };
}