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
    greeting: "",
    paragraphs: [
      "Happy birthday, my love. ❤️ I hope this new year of your life brings you all the happiness, peace, and success you deserve. I feel incredibly lucky that I get to celebrate another year of your life with you. You have brought so much happiness, love, and meaning into my life, and I honestly can't imagine my journey without you in it. Today is your day, but somehow, I feel like I'm the lucky one for having you in my life.",
      "When I look back at our five years together, I can't believe how far we've come. From being just friends, to those secret dates, countless conversations, silly laughs, beautiful memories, and everything we've experienced together—you slowly became such an important part of my life. We've seen so many different versions of each other, grown together, and created memories that I'll carry with me forever. And honestly, if I had the chance to go back and live those five years again, I would choose you all over again.",
      "And now, here we are, still building our lives and chasing our dreams. I know these days are busy for both of us. We're in our struggle phase, trying to build our futures, and sometimes we don't have enough time for each other. But I want you to always remember one thing: no matter how busy life gets, no matter how difficult things become, and no matter where life takes us, I will always love you. I believe there are so many beautiful chapters waiting for us ahead—more places to visit, more memories to make, more dreams to achieve, and hopefully a beautiful life that we build together. I don't know exactly what the future holds, but I know who I want beside me when we get there.",
    ],
    signOff: "Forever and always yours,",
    senderName: "Kamal ❤️",
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

    closingMessage:
      "This little website may only be a few pages of code, but every single part of it was made with you in mind.",

    personalClosingNote:
      "If you've made it this far, I just want you to know how much you mean to me. ❤️ Five years have passed, and somehow I still find new reasons to love you. We've had beautiful days, difficult days, crazy moments, and so many memories that I never want to forget. I know life is a little busy for both of us right now. We're both trying to build our futures, we're in our struggle phase, and sometimes we don't get as much time for each other as we'd like. But please never think that distance, busy days, or less time can change what I feel for you. No matter how life changes, I will always love you. I hope we get to look back at this someday and laugh about how hard these days were, while sitting together and remembering that we made it through everything. Until then, keep chasing your dreams, keep smiling, and always remember that you have someone who will always be cheering for you. Happy birthday, my love. ❤️ Here's to you, to us, and to all the memories we haven't made yet. I love you. ❤️",

    replayWishButton: "Make Another Wish 🎂",

    replayCelebrationButton: "Fireworks & Confetti 🎆",
  },
};
