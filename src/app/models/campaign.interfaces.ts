export interface Message {
  uuid: string;
  phone: string;
  text: string;
  shipping_status: number;
  process_date: string;
  process_hour: string;
}

export interface Campaign {
  uuid: string;
  name: string;
  user: User;
  process_status: number;
  created_at: string;
  process_date: string;
  process_hour: string;
  phone_list?: string[];
  messages: Message[];
}

export interface User {
  uuid: string;
  username: string;
  status: boolean;
}
