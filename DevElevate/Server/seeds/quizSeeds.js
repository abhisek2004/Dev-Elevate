import mongoose from "mongoose";
import Quiz from "../model/Quiz.js";
import User from "../model/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const sampleQuizzes = [
  {
    title: "JavaScript Fundamentals",
    type: "MCQ",
    topic: "JavaScript",
    difficulty: "Easy",
    questions: [
      {
        questionText: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        correctAnswer: "var myVar;"
      },
      {
        questionText: "Which method is used to add an element to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: "push()"
      },
      {
        questionText: "What does '===' operator do in JavaScript?",
        options: ["Assigns value", "Compares value only", "Compares value and type", "Logical AND"],
        correctAnswer: "Compares value and type"
      },
      {
        questionText: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: "Float"
      },
      {
        questionText: "How do you create a function in JavaScript?",
        options: ["function myFunction() {}", "create myFunction() {}", "def myFunction() {}", "func myFunction() {}"],
        correctAnswer: "function myFunction() {}"
      }
    ]
  },
  {
    title: "React Concepts",
    type: "MCQ",
    topic: "React",
    difficulty: "Medium",
    questions: [
      {
        questionText: "What is JSX in React?",
        options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
        correctAnswer: "A syntax extension for JavaScript"
      },
      {
        questionText: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState"
      },
      {
        questionText: "What is the purpose of useEffect hook?",
        options: ["To manage state", "To handle side effects", "To create components", "To style components"],
        correctAnswer: "To handle side effects"
      },
      {
        questionText: "How do you pass data from parent to child component?",
        options: ["Through state", "Through props", "Through context", "Through refs"],
        correctAnswer: "Through props"
      },
      {
        questionText: "What is the virtual DOM in React?",
        options: ["A real DOM element", "A JavaScript representation of the real DOM", "A CSS framework", "A database"],
        correctAnswer: "A JavaScript representation of the real DOM"
      }
    ]
  },
  {
    title: "Node.js Backend Development",
    type: "MCQ",
    topic: "Node.js",
    difficulty: "Medium",
    questions: [
      {
        questionText: "What is Node.js?",
        options: ["A JavaScript framework", "A JavaScript runtime environment", "A database", "A CSS preprocessor"],
        correctAnswer: "A JavaScript runtime environment"
      },
      {
        questionText: "Which module is used to create HTTP servers in Node.js?",
        options: ["fs", "http", "path", "url"],
        correctAnswer: "http"
      },
      {
        questionText: "What is npm?",
        options: ["Node Package Manager", "Node Programming Module", "New Project Manager", "Network Protocol Manager"],
        correctAnswer: "Node Package Manager"
      },
      {
        questionText: "Which method is used to read files asynchronously in Node.js?",
        options: ["fs.readFile()", "fs.readFileSync()", "fs.read()", "fs.open()"],
        correctAnswer: "fs.readFile()"
      },
      {
        questionText: "What is Express.js?",
        options: ["A database", "A web application framework for Node.js", "A CSS framework", "A testing library"],
        correctAnswer: "A web application framework for Node.js"
      }
    ]
  },
  {
    title: "Data Structures & Algorithms",
    type: "MCQ",
    topic: "DSA",
    difficulty: "Hard",
    questions: [
      {
        questionText: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)"
      },
      {
        questionText: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack"
      },
      {
        questionText: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correctAnswer: "O(n²)"
      },
      {
        questionText: "Which traversal technique uses a queue?",
        options: ["DFS", "BFS", "Inorder", "Preorder"],
        correctAnswer: "BFS"
      },
      {
        questionText: "What is a hash collision?",
        options: ["When two keys hash to the same index", "When hash function fails", "When hash table is full", "When key is not found"],
        correctAnswer: "When two keys hash to the same index"
      }
    ]
  },
  {
    title: "Python Programming Basics",
    type: "MCQ",
    topic: "Python",
    difficulty: "Easy",
    questions: [
      {
        questionText: "How do you create a list in Python?",
        options: ["list = []", "list = ()", "list = {}", "list = <>"],
        correctAnswer: "list = []"
      },
      {
        questionText: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctAnswer: "def"
      },
      {
        questionText: "What is the correct way to create a comment in Python?",
        options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
        correctAnswer: "# comment"
      },
      {
        questionText: "Which method is used to add an item to a list?",
        options: ["add()", "append()", "insert()", "push()"],
        correctAnswer: "append()"
      },
      {
        questionText: "What is the output of print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: "<class 'list'>"
      }
    ]
  },
  {
    title: "Database Fundamentals",
    type: "MCQ",
    topic: "Database",
    difficulty: "Medium",
    questions: [
      {
        questionText: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
        correctAnswer: "Structured Query Language"
      },
      {
        questionText: "Which command is used to retrieve data from a database?",
        options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
        correctAnswer: "SELECT"
      },
      {
        questionText: "What is a primary key?",
        options: ["A key that opens the database", "A unique identifier for a record", "The first column in a table", "A password for the database"],
        correctAnswer: "A unique identifier for a record"
      },
      {
        questionText: "Which normal form eliminates partial dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: "2NF"
      },
      {
        questionText: "What is a foreign key?",
        options: ["A key from another database", "A key that references a primary key in another table", "An encrypted key", "A backup key"],
        correctAnswer: "A key that references a primary key in another table"
      }
    ]
  },
  {
    title: "Basic Programming Logic",
    type: "Code",
    topic: "Programming",
    difficulty: "Easy",
    questions: [
      {
        questionText: "Write a function that returns the sum of two numbers. Input: 5, 3",
        expectedOutput: "8"
      },
      {
        questionText: "Write a function that checks if a number is even. Input: 4",
        expectedOutput: "true"
      },
      {
        questionText: "Write a function that returns the factorial of 5.",
        expectedOutput: "120"
      }
    ]
  },
  {
    title: "Web Development Concepts",
    type: "MCQ",
    topic: "Web Development",
    difficulty: "Medium",
    questions: [
      {
        questionText: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        questionText: "Which CSS property is used to change the text color?",
        options: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: "color"
      },
      {
        questionText: "What is the purpose of the <head> tag in HTML?",
        options: ["To display content", "To contain metadata", "To create headers", "To style elements"],
        correctAnswer: "To contain metadata"
      },
      {
        questionText: "Which HTTP method is used to send data to a server?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: "POST"
      },
      {
        questionText: "What is responsive web design?",
        options: ["Fast loading websites", "Websites that respond to user input", "Websites that adapt to different screen sizes", "Websites with animations"],
        correctAnswer: "Websites that adapt to different screen sizes"
      }
    ]
  }
];

async function seedQuizzes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find an admin user to assign as creator (or create a default one)
    let adminUser = await User.findOne({ role: "admin" });
    
    if (!adminUser) {
      // Create a default admin user for quiz creation
      adminUser = new User({
        name: "Quiz Admin",
        email: "quizadmin@develevate.com",
        password: "hashedpassword", // This should be properly hashed in real scenario
        role: "admin",
        isVerified: true
      });
      await adminUser.save();
      console.log("Created default admin user for quiz creation");
    }

    // Clear existing quizzes (optional - remove this line if you want to keep existing quizzes)
    await Quiz.deleteMany({});
    console.log("Cleared existing quizzes");

    // Add createdBy field to each quiz
    const quizzesWithCreator = sampleQuizzes.map(quiz => ({
      ...quiz,
      createdBy: adminUser._id
    }));

    // Insert sample quizzes
    const insertedQuizzes = await Quiz.insertMany(quizzesWithCreator);
    console.log(`Successfully seeded ${insertedQuizzes.length} quizzes`);

    // Display summary
    console.log("\n=== Quiz Seeding Summary ===");
    insertedQuizzes.forEach((quiz, index) => {
      console.log(`${index + 1}. ${quiz.title} (${quiz.difficulty} - ${quiz.topic}) - ${quiz.questions.length} questions`);
    });

    console.log("\n✅ Quiz seeding completed successfully!");
    
  } catch (error) {
    console.error("Error seeding quizzes:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeding function
seedQuizzes();