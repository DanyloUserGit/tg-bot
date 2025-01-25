export interface Button {
  text: string;
  callback_data: string;
}

export interface AddQuestion {
  user_id: number;
  text: string;
  lang: string;
}

export interface Question extends AddQuestion {
  in_progress: boolean;
  closed: boolean;
}