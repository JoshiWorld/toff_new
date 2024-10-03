export const Collections =  {
  stats: "Stats",
  faq: "FAQs",
  live: "Live"
}

export interface Live {
  _id: string;
  title: string;
  description: string;
  date: Date;
  link: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface Stats {
  _id: string;
  platform: string;
  stats: number;
  goal: number;
}