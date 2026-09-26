import { SchoolData, SchoolNotification } from '../types';

export const CHRISTMAS_SCHOOL_INFO: SchoolData = {
  name: "Christmas School 🎄",
  location: "Punjab, HMC, Street Number 1",
  staff: {
    principal: "Elijah Victor",
    teacher: "Aroush",
    admin: "Anum",
  },
  students: [
    "Arnan",
    "Balaj",
    "Eliab"
  ]
};

const NOTIFICATIONS_STORAGE_KEY = 'christmas_school_notifications_v1';

export function getStoredNotifications(): SchoolNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Error loading notifications:', err);
    return [];
  }
}

export function saveNotifications(notifications: SchoolNotification[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  } catch (err) {
    console.error('Error saving notifications:', err);
  }
}
