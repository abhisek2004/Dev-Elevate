

// Define the structure for a single comment
export interface Comment {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

// Define the structure for a discussion post
export interface DiscussionPost {
  id: string;
  author: string;
  timestamp: string;
  title: string;
  content: string;
  tags: string[];
  comments: Comment[];
}

// Create and export the mock data array
export const mockDiscussionPosts: DiscussionPost[] = [
  {
    id: 'post1',
    author: 'Priya Sharma',
    timestamp: '2025-07-22T09:00:00Z',
    title: 'Best way to learn React Hooks in 2025?',
    content: 'I\'m new to React and want to master Hooks. There are so many resources out there, it\'s a bit overwhelming. What path would you recommend for a beginner? Any must-do projects or tutorials that helped you a lot?',
    tags: ['react', 'javascript', 'frontend', 'hooks'],
    comments: [
      {
        id: 'comment1-1',
        author: 'Raj Patel',
        timestamp: '2025-07-22T09:30:00Z',
        content: 'The official React documentation is actually the best place to start. It\'s been updated and is very interactive. After that, build a simple to-do app or a weather app to solidify your understanding.',
      },
      {
        id: 'comment1-2',
        author: 'Anjali Singh',
        timestamp: '2025-07-22T10:15:00Z',
        content: 'I agree with Raj. Also, try to understand the "why" behind hooks like useEffect and its dependency array. That trips up a lot of new developers.',
      },
    ],
  },
  {
    id: 'post2',
    author: 'Vikram Rao',
    timestamp: '2025-07-21T15:45:00Z',
    title: 'Is Tailwind CSS worth it for large-scale applications?',
    content: 'We\'re starting a new enterprise-level project and are debating between using traditional CSS modules/Sass and Tailwind CSS. I love Tailwind for rapid prototyping, but I\'m concerned about maintainability and bundle size in the long run. What are your experiences?',
    tags: ['css', 'tailwind', 'design-systems', 'performance'],
    comments: [
      {
        id: 'comment2-1',
        author: 'Sonia Desai',
        timestamp: '2025-07-21T16:00:00Z',
        content: 'Absolutely worth it! With proper use of `@apply` for custom components and a good base configuration, it\'s incredibly maintainable. The JIT compiler also ensures your final bundle size is minimal.',
      },
    ],
  },
  {
    id: 'post3',
    author: 'Amit Kumar',
    timestamp: '2025-07-20T11:20:00Z',
    title: 'How to handle global state management? Context vs. Redux Toolkit',
    content: 'For smaller apps, the Context API seems sufficient. But at what point should a team consider moving to a more robust solution like Redux Toolkit or Zustand? What are the key performance or complexity indicators to watch out for?',
    tags: ['react', 'state-management', 'redux', 'architecture'],
    comments: [],
  },
];