/**
 * Birthday Website Content Configuration
 * 
 * PERSONALIZATION INSTRUCTIONS:
 * Feel free to replace the placeholders below ([HER NAME], [YOUR NAME], etc.)
 * with your own personal messages. All changes made here automatically
 * update the website without touching any animation code!
 */

export interface BirthdayContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  welcome: {
    prelude: string;
    buttonText: string;
    subHint: string;
  };
  hero: {
    headline: string;
    name?: string;
    date: string;
    dateFormatted: string;
    subtitle: string;
    cakePrompt: string;
    wishMadeText: string;
  };
  timeline: {
    title: string;
    subtitle: string;
  };
  loveLetter: {
    sectionTitle: string;
    envelopeLabel: string;
    envelopeInstruction: string;
    recipientName: string;
    greeting: string;
    paragraphs: string[];
    signOff: string;
    senderName: string;
  };
  loveReasons: {
    title: string;
    subtitle: string;
  };
  suspense: {
    line1: string;
    line2: string;
    line3: string;
    heartCaption: string;
  };
  final: {
    headline: string;
    subheading: string;
    date: string;
    closingMessage: string;
    personalClosingNote: string;
    replayWishButton: string;
    replayCelebrationButton: string;
  };
}

export const birthdayContent: BirthdayContent = {
  meta: {
    title: "Happy Birthday ❤️",
    description: "A little birthday surprise made with love.",
    ogTitle: "Happy Birthday, My Love ❤️",
    ogDescription: "A personalized cinematic birthday surprise.",
  },

  welcome: {
    prelude: "I made something for you...",
    buttonText: "❤️ OPEN YOUR SURPRISE",
    subHint: "Turn on your sound for the best experience",
  },

  hero: {
    headline: "HAPPY BIRTHDAY SEEMA ❤️",
    name: "SEEMA",
    date: "11 • 09 • 2026",
    dateFormatted: "September 11, 2026",
    subtitle: "A little celebration for someone very special.",
    cakePrompt: "Make a wish and click to blow out the candles 🎂",
    wishMadeText: "✨ May all your sweetest wishes come true! ✨",
  },

  timeline: {
    title: "OUR LITTLE STORY",
    subtitle: "Some of my favorite moments with you.",
  },

  loveLetter: {
    sectionTitle: "A LETTER FOR YOU",
    envelopeLabel: "For My Favorite Person",
    envelopeInstruction: "Click to open the wax seal 💌",
    recipientName: "Seema",
    greeting: "Dear Seema,",
    paragraphs: [
      "[YOUR PERSONAL LOVE LETTER GOES HERE — Paragraph 1: You can write about how much she means to you, how her presence transforms your days, and how grateful you are to celebrate another year of her life.]",
      "[Paragraph 2: Mention your favorite qualities about her, a gentle memory, or the warmth she brings into your world whenever she smiles.]",
      "[Paragraph 3: Write your hopes and heartfelt birthday wishes for her upcoming year, promising to be right beside her through every step.]",
    ],
    signOff: "Forever and always yours,",
    senderName: "[YOUR NAME]",
  },

  loveReasons: {
    title: "THINGS I LOVE ABOUT YOU ❤️",
    subtitle: "Just a few of the millions of reasons you have my whole heart.",
  },

  suspense: {
    line1: "But...",
    line2: "There's one more thing I want you to know.",
    line3: "You make my world a little brighter just by being in it.",
    heartCaption: "You are my favorite thought.",
  },

  final: {
    headline: "HAPPY BIRTHDAY ❤️",
    subheading: "To the most beautiful person in my world.",
    date: "11 SEPTEMBER 2026",
    closingMessage: "This little website may only be a few pages of code, but every single part of it was made with you in mind.",
    personalClosingNote: "[YOUR PERSONAL CLOSING MESSAGE — E.g., 'Thank you for being you. Happy 2026 Birthday, darling!']",
    replayWishButton: "Make Another Wish 🎂",
    replayCelebrationButton: "Fireworks & Confetti 🎆",
  },
};
