import type { ProjectRecommendation, UserPreferences } from '../components/ProjectRecommender/ProjectRecommender';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generateProjectRecommendations = async (
  preferences: UserPreferences
): Promise<ProjectRecommendation[]> => {
  const prompt = `You are an AI project advisor for developers. Generate 3-5 personalized project recommendations based on the user's preferences.

User Preferences:
- Known Tech Stack: ${preferences.techStack.join(', ')}
- Career Focus: ${preferences.careerFocus}
- Skill Level: ${preferences.skillLevel}
- Interest Areas: ${Array.isArray(preferences.interestArea) ? preferences.interestArea.join(', ') : preferences.interestArea}

Please respond with a JSON array of project recommendations. Each project should have:
- id: unique identifier
- title: catchy project name
- description: detailed project description (2-3 sentences)
- features: array of 4-6 key features
- difficulty: "Beginner", "Intermediate", or "Advanced" (matching user's skill level or slightly above)
- techStack: array of recommended technologies (include user's known technologies when relevant)
- tags: array of relevant hashtags (e.g., #fullstack, #productivity, etc.)
- estimatedTime: realistic time estimate (e.g., "2-3 weeks")
- starterTutorials: array of tutorial topics (optional)
- githubBoilerplates: array of example GitHub repo URLs (use placeholder URLs)

Make sure projects are:
1. Relevant to the user's career focus and interest area
2. Appropriate for their skill level
3. Use technologies they know or want to learn
4. Solve real problems in their area of interest
5. Portfolio-worthy and impressive to employers

Return only valid JSON without any markdown formatting or explanation.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that generates project recommendations for developers. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      });
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: GroqResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from Groq API');
    }

    // Clean up the response to ensure it's valid JSON
    const cleanedContent = content.trim().replace(/```json\n?|\n?```/g, '');
    
    try {
      const projects = JSON.parse(cleanedContent);
      
      // Validate and sanitize the projects
      if (Array.isArray(projects)) {
        return projects.map((project, index) => ({
          id: project.id || `groq-${Date.now()}-${index}`,
          title: project.title || 'Untitled Project',
          description: project.description || 'No description provided',
          features: Array.isArray(project.features) ? project.features : [],
          difficulty: ['Beginner', 'Intermediate', 'Advanced'].includes(project.difficulty) 
            ? project.difficulty 
            : preferences.skillLevel,
          techStack: Array.isArray(project.techStack) ? project.techStack : preferences.techStack,
          tags: Array.isArray(project.tags) ? project.tags : [],
          estimatedTime: project.estimatedTime || '2-3 weeks',
          starterTutorials: Array.isArray(project.starterTutorials) ? project.starterTutorials : [],
          githubBoilerplates: Array.isArray(project.githubBoilerplates) ? project.githubBoilerplates : []
        }));
      } else {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('Failed to parse Groq response as JSON:', parseError);
      throw new Error('Invalid JSON response from AI');
    }
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
};

// Fallback function for when API fails
export const generateFallbackRecommendations = (preferences: UserPreferences): ProjectRecommendation[] => {
  const baseProjects: Omit<ProjectRecommendation, 'id'>[] = [
    {
      title: 'Smart Task Management System',
      description: 'Build a comprehensive task management application with team collaboration features, deadline tracking, and productivity analytics.',
      features: ['Team collaboration', 'Deadline notifications', 'Progress tracking', 'File attachments', 'Time tracking', 'Analytics dashboard'],
      difficulty: 'Intermediate',
      techStack: preferences.techStack.includes('React') ? ['React', 'Node.js', 'MongoDB'] : ['HTML', 'CSS', 'JavaScript'],
      tags: ['#productivity', '#collaboration', '#fullstack', '#dashboard'],
      estimatedTime: '3-4 weeks',
      starterTutorials: ['Building CRUD Applications', 'User Authentication Basics'],
      githubBoilerplates: ['https://github.com/example/task-manager-starter']
    },
    {
      title: 'Personal Finance Tracker',
      description: 'Create a personal finance application that helps users track expenses, set budgets, and achieve financial goals with beautiful visualizations.',
      features: ['Expense categorization', 'Budget planning', 'Goal setting', 'Data visualization', 'Bank integration', 'Monthly reports'],
      difficulty: preferences.skillLevel === 'Beginner' ? 'Beginner' : 'Intermediate',
      techStack: preferences.techStack.filter(tech => ['HTML', 'CSS', 'JavaScript', 'React'].includes(tech)),
      tags: ['#finance', '#budgeting', '#charts', '#personal'],
      estimatedTime: '2-3 weeks',
      starterTutorials: ['Chart.js for Data Visualization', 'Local Storage Management'],
      githubBoilerplates: ['https://github.com/example/finance-tracker']
    },
    {
      title: 'AI-Powered Code Review Assistant',
      description: 'Develop an intelligent code review tool that analyzes code quality, suggests improvements, and helps maintain coding standards.',
      features: ['Code quality analysis', 'Best practice suggestions', 'Security vulnerability detection', 'Performance recommendations', 'Integration with Git', 'Custom rules'],
      difficulty: 'Advanced',
      techStack: preferences.techStack.includes('Python') ? ['Python', 'Node.js', 'React'] : ['JavaScript', 'Node.js', 'React'],
      tags: ['#ai', '#code-analysis', '#developer-tools', '#automation'],
      estimatedTime: '4-6 weeks',
      starterTutorials: ['Working with AST Parsers', 'Building Developer Tools'],
      githubBoilerplates: ['https://github.com/example/code-review-ai']
    },
    {
      title: 'Healthcare Appointment System',
      description: 'Build a comprehensive healthcare management system for booking appointments, managing patient records, and telemedicine consultations.',
      features: ['Appointment scheduling', 'Patient portal', 'Doctor dashboard', 'Medical records', 'Video consultations', 'Prescription management'],
      difficulty: 'Advanced',
      techStack: preferences.techStack.includes('React') ? ['React', 'Node.js', 'MongoDB', 'Express.js'] : ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      tags: ['#healthcare', '#appointments', '#telemedicine', '#fullstack'],
      estimatedTime: '5-7 weeks',
      starterTutorials: ['HIPAA Compliance Basics', 'Video Calling Integration'],
      githubBoilerplates: ['https://github.com/example/healthcare-system']
    },
    {
      title: 'Open Source Learning Platform',
      description: 'Create an open-source educational platform where users can create courses, track progress, and collaborate on learning projects.',
      features: ['Course creation', 'Progress tracking', 'Discussion forums', 'Peer reviews', 'Certificates', 'Mobile responsive'],
      difficulty: 'Intermediate',
      techStack: preferences.techStack.includes('React') ? ['React', 'Node.js', 'MongoDB'] : ['HTML', 'CSS', 'JavaScript'],
      tags: ['#education', '#open-source', '#learning', '#community'],
      estimatedTime: '4-5 weeks',
      starterTutorials: ['Building Learning Management Systems', 'User Progress Tracking'],
      githubBoilerplates: ['https://github.com/example/learning-platform']
    }
  ];

  // Filter projects based on user preferences
  let filteredProjects = baseProjects.filter(project => {
    // Filter by skill level
    if (preferences.skillLevel === 'Beginner' && project.difficulty === 'Advanced') return false;
    if (preferences.skillLevel === 'Advanced' && project.difficulty === 'Beginner') return false;
    
    // Filter by interest areas
    const interestKeywords = {
      'Productivity': ['task', 'productivity', 'management'],
      'Healthcare': ['healthcare', 'medical', 'health'],
      'Education': ['learning', 'education', 'course'],
      'Finance': ['finance', 'budget', 'money'],
      'AI Tools': ['ai', 'intelligent', 'automation'],
      'Open Source': ['open-source', 'community', 'collaboration'],
      'E-commerce': ['shop', 'commerce', 'store', 'marketplace'],
      'Social Media': ['social', 'chat', 'community', 'network'],
      'Entertainment': ['game', 'entertainment', 'media', 'fun'],
      'Travel': ['travel', 'location', 'maps', 'tourism'],
      'Food & Dining': ['food', 'recipe', 'restaurant', 'dining'],
      'Fitness': ['fitness', 'health', 'workout', 'exercise'],
      'Real Estate': ['property', 'real estate', 'housing', 'rental'],
      'Transportation': ['transport', 'logistics', 'delivery', 'mobility'],
      'Environmental': ['environment', 'green', 'sustainability', 'eco'],
      'Developer Tools': ['development', 'coding', 'programming', 'tools']
    };

    const interestAreas = Array.isArray(preferences.interestArea) ? preferences.interestArea : [preferences.interestArea];
    const allKeywords = interestAreas.flatMap(area => interestKeywords[area as keyof typeof interestKeywords] || []);

    if (allKeywords.length > 0) {
      const projectText = (project.title + ' ' + project.description).toLowerCase();
      return allKeywords.some(keyword => projectText.includes(keyword));
    }
    
    return true;
  });

  // If no projects match, return first 3 projects
  if (filteredProjects.length === 0) {
    filteredProjects = baseProjects.slice(0, 3);
  }

  // Add IDs and return up to 4 projects
  return filteredProjects.slice(0, 4).map((project, index) => ({
    ...project,
    id: `fallback-${Date.now()}-${index}`
  }));
};  