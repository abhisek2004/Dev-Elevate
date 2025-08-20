import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobOpportunity from './model/JobOpportunity.js';
import Resource from './model/Resource.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedJobOpportunities = async () => {
    const jobs = [
        {
            title: 'Software Engineer',
            company: 'Google',
            location: 'Mountain View, CA',
            type: 'Full-time',
            category: 'Product Based',
            description: 'Join our team to build products that help create opportunities for everyone. Work on cutting-edge technologies.',
            requirements: ['BS/MS in Computer Science', '3+ years experience', 'Strong coding skills', 'System design experience'],
            responsibilities: ['Design and implement scalable systems', 'Collaborate with cross-functional teams', 'Mentor junior engineers'],
            salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' },
            benefits: ['Health insurance', '401k matching', 'Free meals', 'Gym membership'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            source: 'Internal',
            tags: ['Software Engineering', 'Full Stack', 'Google'],
            experienceLevel: 'Mid',
            skills: ['JavaScript', 'Python', 'System Design', 'Cloud Computing'],
            isActive: true
        },
        {
            title: 'Senior Software Engineer',
            company: 'Microsoft',
            location: 'Redmond, WA',
            type: 'Full-time',
            category: 'Product Based',
            description: 'Build and maintain software solutions for Microsoft products. Work on Azure, Office, and other platforms.',
            requirements: ['BS/MS in Computer Science', 'C#/Java experience', 'Cloud platforms', 'Problem-solving skills'],
            responsibilities: ['Lead technical projects', 'Architect solutions', 'Code review and mentoring'],
            salary: { min: 130000, max: 200000, currency: 'USD', period: 'yearly' },
            benefits: ['Health insurance', 'Stock options', 'Professional development', 'Flexible work'],
            deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
            source: 'Internal',
            tags: ['Software Engineering', 'Backend', 'Microsoft'],
            experienceLevel: 'Senior',
            skills: ['C#', 'Java', 'Azure', 'System Architecture'],
            isActive: true
        },
        {
            title: 'Software Development Engineer',
            company: 'Amazon',
            location: 'Seattle, WA',
            type: 'Full-time',
            category: 'Product Based',
            description: 'Design and build scalable software solutions for Amazon services. Work on AWS, e-commerce, and logistics.',
            requirements: ['BS/MS in Computer Science', 'Java/Python experience', 'System design', 'Leadership skills'],
            responsibilities: ['Design distributed systems', 'Optimize performance', 'Mentor team members'],
            salary: { min: 140000, max: 220000, currency: 'USD', period: 'yearly' },
            benefits: ['Health insurance', 'Stock options', '401k matching', 'Relocation assistance'],
            deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
            source: 'Internal',
            tags: ['Software Engineering', 'Full Stack', 'Amazon'],
            experienceLevel: 'Senior',
            skills: ['Java', 'Python', 'AWS', 'Distributed Systems'],
            isActive: true
        },
        {
            title: 'Software Engineer',
            company: 'Meta',
            location: 'Menlo Park, CA',
            type: 'Full-time',
            category: 'Product Based',
            description: 'Build products that connect billions of people. Work on Facebook, Instagram, WhatsApp, and VR platforms.',
            requirements: ['BS/MS in Computer Science', 'C++/Python experience', 'Large-scale systems', 'Innovation mindset'],
            responsibilities: ['Build social media features', 'Scale infrastructure', 'Collaborate with designers'],
            salary: { min: 150000, max: 250000, currency: 'USD', period: 'yearly' },
            benefits: ['Health insurance', 'Stock options', 'Free food', 'On-site amenities'],
            deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), // 40 days from now
            source: 'Internal',
            tags: ['Software Engineering', 'Social Media', 'Meta'],
            experienceLevel: 'Mid',
            skills: ['C++', 'Python', 'Large-scale Systems', 'Social Networks'],
            isActive: true
        },
        {
            title: 'Senior Software Engineer',
            company: 'Netflix',
            location: 'Los Gatos, CA',
            type: 'Full-time',
            category: 'Product Based',
            description: 'Build the future of entertainment. Work on streaming platform, recommendation systems, and content delivery.',
            requirements: ['5+ years experience', 'Java/Go expertise', 'Microservices', 'High-scale systems'],
            responsibilities: ['Design microservices', 'Optimize streaming', 'Improve recommendations'],
            salary: { min: 180000, max: 300000, currency: 'USD', period: 'yearly' },
            benefits: ['Health insurance', 'Stock options', 'Unlimited vacation', 'Remote work'],
            deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
            source: 'Internal',
            tags: ['Software Engineering', 'Streaming', 'Netflix'],
            experienceLevel: 'Senior',
            skills: ['Java', 'Go', 'Microservices', 'Streaming Systems'],
            isActive: true
        }
    ];

    try {
        await JobOpportunity.deleteMany({}); // Clear existing data
        const createdJobs = await JobOpportunity.insertMany(jobs);
        console.log(`✅ Created ${createdJobs.length} job opportunities`);
        return createdJobs;
    } catch (error) {
        console.error('❌ Error seeding job opportunities:', error);
        throw error;
    }
};

const seedResources = async () => {
    const resources = [
        {
            title: 'Complete Interview Preparation Guide',
            description: 'A comprehensive guide covering technical, HR, and behavioral interview questions with sample answers. Includes coding problems, system design scenarios, and behavioral examples.',
            type: 'PDF',
            category: 'Interview Prep',
            difficulty: 'Intermediate',
            fileUrl: '/resources/interview-guide.pdf',
            fileSize: 2048576, // 2MB
            tags: ['Interview', 'Guide', 'Preparation', 'Technical', 'HR', 'Behavioral'],
            author: 'DevElevate Team',
            version: '2.1',
            isActive: true,
            downloads: 1250,
            views: 3200,
            rating: { average: 4.5, count: 89 },
            estimatedTime: 120,
            prerequisites: ['Basic programming knowledge', 'Understanding of software development'],
            learningOutcomes: ['Master common interview questions', 'Learn STAR method for behavioral questions', 'Practice technical problem solving']
        },
        {
            title: 'DSA Practice Problems - Advanced',
            description: 'Collection of advanced data structures and algorithms problems with solutions and explanations. Covers dynamic programming, graph algorithms, and advanced data structures.',
            type: 'PDF',
            category: 'DSA',
            difficulty: 'Advanced',
            fileUrl: '/resources/dsa-advanced.pdf',
            fileSize: 1536000, // 1.5MB
            tags: ['DSA', 'Algorithms', 'Advanced', 'Dynamic Programming', 'Graphs'],
            author: 'DevElevate Team',
            version: '1.8',
            isActive: true,
            downloads: 890,
            views: 2100,
            rating: { average: 4.7, count: 67 },
            estimatedTime: 180,
            prerequisites: ['Basic DSA knowledge', 'Programming experience'],
            learningOutcomes: ['Master advanced algorithms', 'Solve complex problems', 'Improve problem-solving skills']
        },
        {
            title: 'System Design Interview Handbook',
            description: 'Complete guide to system design interviews. Covers scalability, distributed systems, databases, caching, and real-world examples from top tech companies.',
            type: 'PDF',
            category: 'System Design',
            difficulty: 'Advanced',
            fileUrl: '/resources/system-design-handbook.pdf',
            fileSize: 3072000, // 3MB
            tags: ['System Design', 'Architecture', 'Scalability', 'Distributed Systems'],
            author: 'DevElevate Team',
            version: '1.5',
            isActive: true,
            downloads: 650,
            views: 1800,
            rating: { average: 4.8, count: 45 },
            estimatedTime: 240,
            prerequisites: ['Software engineering experience', 'Basic system knowledge'],
            learningOutcomes: ['Design scalable systems', 'Understand distributed architecture', 'Master system design patterns']
        },
        {
            title: 'Resume Optimization Guide',
            description: 'Step-by-step guide to create an ATS-friendly resume that gets past screening systems and impresses hiring managers. Includes templates and examples.',
            type: 'PDF',
            category: 'Resume',
            difficulty: 'Beginner',
            fileUrl: '/resources/resume-guide.pdf',
            fileSize: 1024000, // 1MB
            tags: ['Resume', 'ATS', 'Career', 'Job Search'],
            author: 'DevElevate Team',
            version: '2.0',
            isActive: true,
            downloads: 2100,
            views: 4500,
            rating: { average: 4.6, count: 156 },
            estimatedTime: 60,
            prerequisites: ['Basic writing skills'],
            learningOutcomes: ['Create ATS-friendly resumes', 'Highlight key achievements', 'Optimize for job applications']
        },
        {
            title: 'Behavioral Interview Questions Bank',
            description: 'Comprehensive collection of behavioral interview questions with sample answers using the STAR method. Covers leadership, teamwork, problem-solving, and more.',
            type: 'PDF',
            category: 'Interview Prep',
            difficulty: 'Intermediate',
            fileUrl: '/resources/behavioral-questions.pdf',
            fileSize: 1536000, // 1.5MB
            tags: ['Behavioral', 'Interview', 'STAR Method', 'Soft Skills'],
            author: 'DevElevate Team',
            version: '1.9',
            isActive: true,
            downloads: 980,
            views: 2800,
            rating: { average: 4.4, count: 78 },
            estimatedTime: 90,
            prerequisites: ['Work experience', 'Understanding of STAR method'],
            learningOutcomes: ['Master STAR method', 'Answer behavioral questions', 'Improve communication skills']
        }
    ];

    try {
        await Resource.deleteMany({}); // Clear existing data
        const createdResources = await Resource.insertMany(resources);
        console.log(`✅ Created ${createdResources.length} resources`);
        return createdResources;
    } catch (error) {
        console.error('❌ Error seeding resources:', error);
        throw error;
    }
};

const main = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting to seed placement preparation data...\n');

        await seedJobOpportunities();
        await seedResources();

        console.log('\n🎉 All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding data:', error);
        process.exit(1);
    }
};

main();
