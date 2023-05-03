interface Question {
  title: string;
  description?: string;
  error?: string;
  type: "choice" | "rating";
  options: string[];
  other?: string;
  multiple?: boolean;
}

export const SURVEY: Array<Question> = [
  {
    title: "What's your preferred online platform to keep yourself updated?",
    type: "choice",
    options: [
      "News Platforms  (Inshorts)",
      "Upskill & Education Platforms (Frontrow, Skillshare, Udemy, Coursera)",
      "Podcasts (Google, Spotify)",
    ],
    other: "Any other kind",
    multiple: true,
  },
  {
    title: "How often do you use these platforms?",
    type: "choice",
    options: ["Everyday", "2-3 days a week", "Once a week", "Monthly"],
  },
  {
    title:
      "Rank the problems faced while learning online (5 being the most relatable). Leave empty if NA",
    type: "rating",
    options: [
      "Lengthy content",
      "Lack of innovative content",
      "High Price",
      "Irrelevancy",
      "Absence of accountability",
    ],
    other: "Others",
    multiple: true,
  },
  {
    title: "What are your preferred social media platform(s)?",
    type: "choice",
    options: ["Instagram", "Facebook", "TikTok", "Reddit", "Twitter"],
    other: "Other",
    multiple: true,
  },
  {
    title: "How frequently do you use social media?",
    type: "choice",
    options: [
      "Multiple times a day",
      "Once every day",
      "Sometimes (Once every few weeks)",
      "Rarely: Once a month or less",
    ],
  },
  {
    title: "What are the primary reasons behind your social media usage?",
    type: "choice",
    options: [
      "To socialize",
      "As a mental escape",
      "To stay informed & updated",
      "To pass time",
      "To post/create",
    ],
    other: "Other reasons",
    multiple: true,
  },
  {
    title: "Rank these content genres based on your preference.",
    type: "rating",
    options: [
      "Entertainment (dance, music, humor)",
      "Knowledge (podcast clips, DIYs, tips)",
      "News & Updates",
      "Discussions & Opinions",
    ],
    other: "Other genre(s)",
    multiple: true,
  },
  {
    title:
      "Do you face any issues with the current social media environment? Rank them below if yes or leave empty if NA",
    type: "rating",
    options: [
      "Cluttered experience (getting bombarded with unorganized content)",
      "Misinformation",
      "Content that does not add value",
      "Distractive/addictive environment",
    ],
    other: "Other issues",
    multiple: true,
  },
  {
    title:
      "If any issue(s) marked above, how frequently do you encounter the same?",
    type: "choice",
    options: [
      "Whenever I open social media",
      "Once every 10-15 sessions",
      "Sometimes (Once every few weeks)",
      "Rarely: Once a month or less",
      "NA",
    ],
  },
];

export const NO_HEADER_MESSAGE =
  "No values in the header row - fill the first row with header values before trying to interact with rows";
