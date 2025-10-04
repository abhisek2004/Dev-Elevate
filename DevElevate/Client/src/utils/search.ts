import { BookOpen, MessageSquare, FileText, Target, Newspaper } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface SearchItem {
  type: 'course' | 'feature' | 'topic' | 'tool';
  title: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export const searchableContent: SearchItem[] = [
  // Learning Hub
  { type: 'course', title: 'Data Structures & Algorithms', path: '/learning', icon: BookOpen, description: 'Master DSA concepts and problem solving' },
  { type: 'course', title: 'Java Programming', path: '/learning', icon: BookOpen, description: 'Learn Java from basics to advanced' },
  { type: 'course', title: 'MERN Stack Development', path: '/learning', icon: BookOpen, description: 'Full-stack web development with MERN' },
  { type: 'course', title: 'AI/ML & Data Science', path: '/learning', icon: BookOpen, description: 'Machine learning and data science fundamentals' },
  
  // Features
  { type: 'feature', title: 'Study Buddy AI', path: '/chatbot', icon: MessageSquare, description: 'Get AI-powered help with your queries' },
  { type: 'feature', title: 'Resume Builder', path: '/resume', icon: FileText, description: 'Create ATS-friendly resumes' },
  { type: 'feature', title: 'Placement Preparation', path: '/placement', icon: Target, description: 'Interview prep and job opportunities' },
  { type: 'feature', title: 'Tech News Feed', path: '/news', icon: Newspaper, description: 'Latest tech news and updates' },
  
  // Topics
  { type: 'topic', title: 'Arrays and Strings', path: '/learning?topic=arrays', icon: BookOpen, description: 'Learn array manipulation and string algorithms' },
  { type: 'topic', title: 'Binary Trees', path: '/learning?topic=trees', icon: BookOpen, description: 'Tree data structures and traversals' },
  { type: 'topic', title: 'Dynamic Programming', path: '/learning?topic=dp', icon: BookOpen, description: 'Master DP concepts and patterns' },
  { type: 'topic', title: 'System Design', path: '/learning?topic=system-design', icon: BookOpen, description: 'Learn to design scalable systems' },
  { type: 'topic', title: 'React Hooks', path: '/learning?topic=react', icon: BookOpen, description: 'Modern React development patterns' },
  { type: 'topic', title: 'Node.js APIs', path: '/learning?topic=nodejs', icon: BookOpen, description: 'Backend development with Node.js' },
  
  // Tools
  { type: 'tool', title: 'Mock Interview', path: '/placement?tab=mock', icon: Target, description: 'Practice interviews with AI' },
  { type: 'tool', title: 'Code Practice', path: '/learning?practice=true', icon: BookOpen, description: 'Solve coding problems' },
  { type: 'tool', title: 'Progress Tracker', path: '/', icon: Target, description: 'Track your learning progress' },
  { type: 'tool', title: 'Daily Goals', path: '/', icon: Target, description: 'Set and achieve daily learning goals' }
];

export const searchTypes = ['course', 'feature', 'topic', 'tool'] as const;

export type SearchType = typeof searchTypes[number];

export interface SearchFilters {
  types: SearchType[];
}

export const filterSearchResults = (
  items: SearchItem[],
  query: string,
  filters: SearchFilters
): SearchItem[] => {
  if (!query.trim() && filters.types.length === 0) {
    return items;
  }

  return items.filter(item => {
    // Filter by type if specified
    if (filters.types.length > 0 && !filters.types.includes(item.type)) {
      return false;
    }

    // Filter by query if provided
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
};

export const getTypeDisplayName = (type: SearchType): string => {
  const typeNames: Record<SearchType, string> = {
    course: 'Courses',
    feature: 'Features',
    topic: 'Topics',
    tool: 'Tools'
  };
  return typeNames[type];
};

export const getTypeIcon = (type: SearchType): LucideIcon => {
  const typeIcons: Record<SearchType, LucideIcon> = {
    course: BookOpen,
    feature: MessageSquare,
    topic: BookOpen,
    tool: Target
  };
  return typeIcons[type];
};