export interface Post {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishDate: string;
  category: "tech" | "internships" | "jobs" | "events";
}
