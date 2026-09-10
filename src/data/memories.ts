/**
 * Our Story / Memory Timeline Data
 * 
 * PERSONALIZATION INSTRUCTIONS:
 * 1. Replace [MEMORY TITLE], [MEMORY DATE], and [MEMORY DESCRIPTION] with your real moments.
 * 2. Put your real photos into /public/images/ (e.g. memory-01.jpg, etc.) and update the `image` path below.
 * 3. Add or remove memories as desired; the vertical parallax timeline adjusts dynamically!
 */

export interface MemoryItem {
  id: number;
  chapter: string;
  date: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  quote?: string;
}

export const memories: MemoryItem[] = [
  {
    id: 1,
    chapter: "01",
    date: "[DATE — E.g. First Met / Summer 2024]",
    title: "The Beginning",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., The first moment our eyes met, or our first conversation where hours flew by like minutes. Everything felt natural and right.]",
    image: "/gallery/IMG-20220126-WA0064.jpg",
    location: "[LOCATION — E.g., The Cozy Café]",
    quote: "Where our journey started...",
  },
  {
    id: 2,
    chapter: "02",
    date: "[DATE — E.g. That Unforgettable Evening]",
    title: "That Special Day",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., That rainy evening we walked through the city streets laughing under one tiny umbrella, not caring about getting drenched.]",
    image: "/gallery/IMG-20230204-WA0015.jpg",
    location: "[LOCATION — E.g., City Center / Under The Lights]",
    quote: "The day I knew you were the one.",
  },
  {
    id: 3,
    chapter: "03",
    date: "[DATE — E.g. First Road Trip / Weekend Away]",
    title: "One of My Absolute Favorites",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., Watching the sun dip into the horizon, listening to our favorite songs playing softly on repeat in the car.]",
    image: "/gallery/IMG-20231011-WA0006.jpg",
    location: "[LOCATION — E.g., The Coastline Viewpoint]",
    quote: "Lost in the magic of the moment.",
  },
  {
    id: 4,
    chapter: "04",
    date: "[DATE — E.g. A Cozy Rainy Sunday]",
    title: "Our Quiet Moments",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., Sitting on the sofa sharing a cup of hot tea and a single blanket, talking about everything and nothing at all.]",
    image: "/gallery/IMG-20231027-WA0013.jpg",
    location: "[LOCATION — E.g., Home Sweet Home]",
    quote: "Peace is being next to you.",
  },
  {
    id: 5,
    chapter: "05",
    date: "[DATE — E.g. That Hilarious Cooking Disaster / Day Out]",
    title: "Laughter Everywhere",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., The time we tried baking and made a huge mess, laughing until our stomachs hurt and our eyes teared up.]",
    image: "/gallery/IMG-20231215-WA0005.jpg",
    location: "[LOCATION — E.g., The Kitchen Studio]",
    quote: "Your laugh is my favorite melody.",
  },
  {
    id: 6,
    chapter: "06",
    date: "September 11, 2026",
    title: "Today & Every Day Forward",
    description: "[YOUR PERSONAL MEMORY DESCRIPTION — E.g., Today we celebrate you. And I can't wait for all the memories, trips, quiet mornings, and adventures ahead.]",
    image: "/gallery/IMG-20240126-WA0006.jpg",
    location: "[LOCATION — E.g., Right Here, With You]",
    quote: "The best chapters are still to come.",
  },
];
