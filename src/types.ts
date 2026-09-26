export interface SchoolStaff {
  principal: string;
  teacher: string;
  admin: string;
}

export interface SchoolData {
  name: string;
  location: string;
  staff: SchoolStaff;
  students: string[];
}

export interface SchoolNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  urgent?: boolean;
}

export type ActiveTab = 'home' | 'help' | 'information' | 'notifications' | 'assistant';
