/**
 * Things I Love About You Data
 * 
 * PERSONALIZATION INSTRUCTIONS:
 * Customize each reason card below with your own sentiments.
 * The `tag` and `personalNote` are revealed on card interaction / expansion.
 */

export interface LoveReason {
  id: number;
  iconName: "Sparkles" | "Smile" | "HeartHandshake" | "Heart" | "Gift" | "Sun";
  title: string;
  summary: string;
  tag: string;
  personalNote: string;
}

export const loveReasons: LoveReason[] = [
  {
    id: 1,
    iconName: "Sparkles",
    title: "That Smile of Yours 😊",
    summary: "Honestly, your smile is one of the first things I fell in love with.",
    tag: "My Favorite Smile ❤️",
    personalNote:
      "I don't know how you do it, but whenever you smile at me, my whole mood just changes. I could look at that smile forever.",
  },

  {
    id: 2,
    iconName: "Smile",
    title: "Your Laugh 😂",
    summary: "I love how you laugh, especially when you completely forget to control it.",
    tag: "My Favorite Sound 🎧",
    personalNote:
      "Your real, uncontrollable laugh is probably my favorite thing. And honestly, sometimes I say something stupid just to hear you laugh.",
  },

  {
    id: 3,
    iconName: "HeartHandshake",
    title: "Your Kind Heart 🥹",
    summary: "You care about people in a way that I really admire about you.",
    tag: "That Big Heart ❤️",
    personalNote:
      "I love how you care about the people you love. Even when you don't say much, you always find little ways to show that you care.",
  },

  {
    id: 4,
    iconName: "Heart",
    title: "The Way You Care About Me 🫶",
    summary: "You have your own little ways of making me feel loved and cared for.",
    tag: "You & Me 💕",
    personalNote:
      "I love the way you check on me, ask how I'm doing, remember little things I tell you, and somehow know when something is bothering me.",
  },

  {
    id: 5,
    iconName: "Gift",
    title: "All Your Little Things 🥰",
    summary: "It's the little things you do that make you... well, you.",
    tag: "Just You 💗",
    personalNote:
      "Your little habits, the way you talk, the random things you say, and even the things you probably don't notice about yourself are some of the things I love most.",
  },

  {
    id: 6,
    iconName: "Sun",
    title: "Just Being With You ❤️",
    summary: "It doesn't really matter where we are. I just like having you around.",
    tag: "My Favorite Person 🌎",
    personalNote:
      "We don't need fancy dates or big plans. Sometimes just sitting with you, talking about random things, or even doing nothing feels like enough for me.",
  },
];