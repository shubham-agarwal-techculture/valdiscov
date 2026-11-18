export type Artwork = "chair" | "notebook" | "window" | "custom";

export type Dimension = {
  label: string;
  distribution: number[];
};

export type Campaign = {
  id: string;
  number: string;
  title: string;
  deck: string;
  context: string;
  category: string;
  closes: string;
  contributors: number;
  owner: string;
  artwork: Artwork;
  dimensions: Dimension[];
  reflection: string;
};

export const initialCampaigns: Campaign[] = [
  {
    id: "chair",
    number: "01",
    title: "A chair that remembers",
    deck: "What does a well-used object hold?",
    context:
      "A wooden chair has moved through three homes and gathered a few small repairs along the way. We are curious whether its history changes how you read its usefulness.",
    category: "Material life",
    closes: "4 days left",
    contributors: 38,
    owner: "Mira Sen",
    artwork: "chair",
    dimensions: [
      { label: "Still useful", distribution: [1, 2, 5, 14, 16] },
      { label: "Full of character", distribution: [0, 3, 6, 12, 17] },
      { label: "Worth keeping", distribution: [2, 3, 8, 11, 14] },
    ],
    reflection:
      "So far, people seem to value the marks of use as evidence of care—not as damage. Does a repair make something feel more or less worth keeping?",
  },
  {
    id: "notebook",
    number: "02",
    title: "The last blank page",
    deck: "Is an unfinished thing still full of possibility?",
    context:
      "A notebook with one page left: keep it pristine, fill it with something small, or pass it on? This inquiry looks at the difference between potential and use.",
    category: "Everyday rituals",
    closes: "8 days left",
    contributors: 24,
    owner: "Jonah Park",
    artwork: "notebook",
    dimensions: [
      { label: "Useful as it is", distribution: [1, 3, 8, 8, 4] },
      { label: "Room for possibility", distribution: [0, 2, 5, 9, 8] },
      { label: "Ready to pass on", distribution: [6, 7, 5, 4, 2] },
    ],
    reflection:
      "A few people describe the empty page as a promise; others say its usefulness depends on finally writing in it.",
  },
  {
    id: "window",
    number: "03",
    title: "Light at 6:13 pm",
    deck: "Can a passing moment be something we keep?",
    context:
      "One ordinary window, caught at the brief hour when the room turns amber. We are asking what makes a moment feel worth noticing.",
    category: "Ways of seeing",
    closes: "12 days left",
    contributors: 61,
    owner: "The Open Room",
    artwork: "window",
    dimensions: [
      { label: "A moment worth noticing", distribution: [0, 1, 5, 19, 36] },
      { label: "Feels familiar", distribution: [2, 5, 16, 22, 16] },
      { label: "Would share with someone", distribution: [3, 5, 12, 18, 23] },
    ],
    reflection:
      "Familiarity and surprise show up side by side in the responses. Many people mention a room they remember.",
  },
];
