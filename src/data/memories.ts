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
    id: 0,

    chapter: "00",

    date: "Back When We Were Just Friends",

    title: "The Picture That Stole My Heart",

    description: "I still remember asking you for a picture when we were just friends, and then you sent me this one. I don't know what it was about this picture, but it stayed with me. Somewhere between looking at this picture and talking to you, I started falling for you without even realizing it. You probably didn't know it then, but this picture had already started stealing my heart.",

    image: "/images/memories/1 (3).jpg",

    location: "Back When We Were Just Friends",

    quote: "You sent me a picture. I found a reason to fall in love."
  }
  ,
  {
    id: 1,
    chapter: "01",
    date: "First Met / Summer 2024",
    title: "The Place where we meet (Techzoid)",
    description:
      "This was the place where our story quietly began. I still remember those first moments, our first conversations, and how naturally everything seemed to flow between us. We could talk for hours, yet somehow it always felt like only a few minutes had passed. I never knew that an ordinary place like Techzoid would end up becoming such a special part of my life. And tumha yah ha when I asked you \"ki ap shia tw nae ho 😂\" ",
    image: "/images/memories/1 (4).jpg",
    location: "Techzoid",
    quote: "Where our journey started...",
  },
  {
    id: 2,
    chapter: "02",
    date: "Unforgettable Day",
    title: "Our First Date",
    description:
      "This was the day we went on our first date at the university. My legs were literally shaking, my heart was racing, and for a few seconds, it felt like everything around me had disappeared. I was nervous, excited, happy, and completely lost in the moment — all at the same time. But more than anything, I was just incredibly happy to finally see you, to be there with you, and to know that this was no longer just a feeling I had kept inside. It was the most beautiful day of my life, and even today, thinking about that moment brings back the same warmth in my heart. ❤️",
    image: "/images/memories/1 (7).jpg",
    location: "University",
    quote: "The day I saw you and forgot everything else around me. ❤️",
  },
  {
    id: 3,

    chapter: "03",

    date: "One of My Favorite Memories",
    title: "The Food Corridor Date — One of My Absolute Favorites",
    description: "The Food Corridor was the one place that somehow managed to keep our secret dates a secret 😂. It became our little escape — a place where we could sit together, eat, talk, laugh, and forget about everything else for a while. Looking back, it wasn't really about the food or the place. It was about those little moments with you that made an ordinary day feel special. Somehow, this place became a small part of our story.",
    image: "/images/memories/1 (6).jpg",
    location: "The Food Corridor",
    quote: "Some places become special simply because of the person you shared them with."
  }
  ,
  {
    id: 4,

    chapter: "04",

    date: "That Beautiful Day at University Park",

    title: "The University Park Date",

    description: "This was such a special and fun date. I remember us just sitting there, talking and laughing as if we had known each other for years. And then we went for a walk towards Danyore, crossing that bridge together. It might have seemed like just a simple walk, but those little moments with you are the ones that stay with me. Looking back, I think that's what I loved most.",

    image: "/images/memories/1 (1).jpg",

    location: "University Park → Danyore",

    quote: "It was never about where we went. It was always about being there with you."
  },


];
