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
    title: "Your Radiant Smile",
    summary: "The effortless way it lights up an entire room and warms my coldest days.",
    tag: "Pure Light",
    personalNote: "[ADD PERSONAL NOTE: E.g., The genuine crinkle near your eyes whenever you are truly happy is my favorite sight in the world.]",
  },
  {
    id: 2,
    iconName: "Smile",
    title: "Your Contagious Laugh",
    summary: "The sweetest, most melodic sound that instantly makes everything better.",
    tag: "My Favorite Sound",
    personalNote: "[ADD PERSONAL NOTE: E.g., Especially that unrestrained, pure laugh when something caught you completely off guard.]",
  },
  {
    id: 3,
    iconName: "HeartHandshake",
    title: "Your Gentle Kindness",
    summary: "How deeply and tenderly you treat everyone around you with grace and empathy.",
    tag: "Golden Heart",
    personalNote: "[ADD PERSONAL NOTE: E.g., The way you notice when someone is having a rough day and quietly make them feel cared for.]",
  },
  {
    id: 4,
    iconName: "Heart",
    title: "The Way You Care",
    summary: "The warmth and thoughtfulness you pour into the people and things you cherish.",
    tag: "Unconditional",
    personalNote: "[ADD PERSONAL NOTE: E.g., The way you check in on me, remember little things I mentioned weeks ago, and always make me feel supported.]",
  },
  {
    id: 5,
    iconName: "Gift",
    title: "The Little Things You Do",
    summary: "The cute habits, tiny gestures, and quirks that make you uniquely you.",
    tag: "Small Wonders",
    personalNote: "[ADD PERSONAL NOTE: E.g., The way you hold your tea mug with both hands or hum softly to yourself when you're focusing.]",
  },
  {
    id: 6,
    iconName: "Sun",
    title: "Making Ordinary Days Special",
    summary: "A simple grocery run or quiet walk feels like the greatest adventure with you.",
    tag: "Everyday Magic",
    personalNote: "[ADD PERSONAL NOTE: E.g., You turn the mundane into magical memories simply by being there by my side.]",
  },
];
