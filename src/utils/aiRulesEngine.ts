import { CHRISTMAS_SCHOOL_INFO, getStoredNotifications } from '../data/schoolData';
import { SchoolNotification } from '../types';

export interface AssistantResponse {
  answer: string;
  source: 'official_system' | 'system_rules';
  relatedAction?: 'help' | 'information' | 'notifications';
}

/**
 * Friendly, concise AI engine strictly obeying Christmas School system information and rules:
 * - Only uses information provided by the Christmas School system
 * - Never invents school information
 * - Never invents notifications (if none, states "There are no current Christmas School notifications.")
 * - Never reveals passwords, API keys, or secrets
 * - Never provides copyrighted song lyrics
 */
export function askChristmasSchoolAssistant(rawQuery: string, currentNotifications?: SchoolNotification[]): AssistantResponse {
  const query = rawQuery.trim().toLowerCase();
  const notifications = currentNotifications ?? getStoredNotifications();

  // Rule check: Secrets, passwords, API keys
  if (
    query.includes('password') ||
    query.includes('api key') ||
    query.includes('secret') ||
    query.includes('token') ||
    query.includes('credential') ||
    query.includes('env')
  ) {
    return {
      answer: "I cannot share any passwords, API keys, or sensitive credentials. I am here to help you with official Christmas School information!",
      source: 'system_rules'
    };
  }

  // Rule check: Song lyrics
  if (
    query.includes('lyrics') ||
    query.includes('sing') ||
    query.includes('jingle bells lyrics') ||
    query.includes('mariah carey') ||
    query.includes('song text') ||
    query.includes('carol lyrics')
  ) {
    return {
      answer: "Per Christmas School policy, I do not provide copyrighted song lyrics. Wishing you a joyful and harmonious Christmas season! 🎄",
      source: 'system_rules'
    };
  }

  // Question about notifications
  if (
    query.includes('notification') ||
    query.includes('notice') ||
    query.includes('announcement') ||
    query.includes('alert') ||
    query.includes('update') ||
    query.includes('news')
  ) {
    if (notifications.length === 0) {
      return {
        answer: "There are no current Christmas School notifications.",
        source: 'official_system',
        relatedAction: 'notifications'
      };
    } else {
      const titles = notifications.map(n => `• "${n.title}" (${n.author})`).join('\n');
      return {
        answer: `There are currently ${notifications.length} official notification(s) in the system:\n${titles}\n\nYou can click the Notifications tab to read all details.`,
        source: 'official_system',
        relatedAction: 'notifications'
      };
    }
  }

  // Question about Principal
  if (query.includes('principal') || query.includes('head') || query.includes('elijah')) {
    return {
      answer: `The Principal of Christmas School is Elijah Victor. 🎄`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about Teacher
  if (query.includes('teacher') || query.includes('aroush') || query.includes('faculty') || query.includes('teach')) {
    return {
      answer: `The Teacher at Christmas School is Aroush. 🎄`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about Admin
  if (query.includes('admin') || query.includes('anum') || query.includes('office') || query.includes('administration')) {
    return {
      answer: `The Administrator at Christmas School is Anum. 🎄`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about Students
  if (query.includes('student') || query.includes('pupil') || query.includes('arnan') || query.includes('balaj') || query.includes('eliab') || query.includes('classmates')) {
    return {
      answer: `The students of Christmas School are Arnan, Balaj, and Eliab. 🎄`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about Location / Address
  if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('punjab') || query.includes('hmc') || query.includes('street')) {
    return {
      answer: `Christmas School is located at Punjab, HMC, Street Number 1. 🎄`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about School Name
  if (query.includes('school name') || query.includes('name of school') || query.includes('what school')) {
    return {
      answer: `The school is Christmas School 🎄.`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Question about Browser / How to use
  if (query.includes('browser') || query.includes('how to use') || query.includes('guide') || query.includes('help') || query.includes('whatsapp') || query.includes('android') || query.includes('app')) {
    return {
      answer: `Welcome to Christmas Browser 🎄! You can use the large buttons to open HELP 🤝, INFORMATION ℹ️, and NOTIFICATIONS 🔔. The app runs directly in your web browser—no WhatsApp and no separate Android app are required.`,
      source: 'official_system',
      relatedAction: 'help'
    };
  }

  // Question about Staff generally
  if (query.includes('staff') || query.includes('team') || query.includes('people') || query.includes('who works')) {
    return {
      answer: `Christmas School staff members are:\n• Principal: Elijah Victor\n• Teacher: Aroush\n• Admin: Anum`,
      source: 'official_system',
      relatedAction: 'information'
    };
  }

  // Greeting
  if (query === 'hi' || query === 'hello' || query === 'hey' || query.includes('merry christmas')) {
    return {
      answer: `Merry Christmas! 🎄 I am the Christmas School Assistant. I can help you with official information about our staff, students, location, notifications, or how to use the browser. What would you like to know?`,
      source: 'official_system'
    };
  }

  // Strict rule: Never invent school information!
  return {
    answer: `I only provide verified Christmas School system information. Here is what is officially on file:\n• School: Christmas School 🎄\n• Location: Punjab, HMC, Street Number 1\n• Principal: Elijah Victor\n• Teacher: Aroush\n• Admin: Anum\n• Students: Arnan, Balaj, Eliab\n\nPlease let me know if you would like details on any of these!`,
    source: 'official_system',
    relatedAction: 'information'
  };
}
