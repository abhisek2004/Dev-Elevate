import express from 'express';
import PDFDocument from 'pdfkit';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;

// ============================================================================
// DEVELOPER GUIDE: How to Customize PDF Downloads
// ============================================================================
// 
// OPTION 1: Replace PDF Content (Recommended)
// - Find the section marked "REPLACE THIS SECTION WITH YOUR OWN PDF CONTENT"
// - Replace the doc.text() calls with your own content
// - Keep the doc.pipe(res) and doc.end() calls
//
// OPTION 2: Serve Static PDF Files
// - Replace the entire function with:
//   app.get('/api/pdf/interview-guide', (req, res) => {
//     res.sendFile(path.join(__dirname, 'your-file.pdf'));
//   });
// - Place your PDF files in the same directory as this file
//
// OPTION 3: Generate PDFs from Templates
// - Use PDFKit to create more complex PDFs with images, tables, etc.
// - Reference: https://pdfkit.org/docs/getting_started.html
//
// ============================================================================

// Middleware
app.use(cors());
app.use(express.json());

// ============================================================================
// DEVELOPER NOTE: To replace this PDF with your own content:
// 1. Replace the PDF generation code below with your own PDF content
// 2. Or replace the entire function to serve a static PDF file
// 3. Example for static file: res.sendFile(path.join(__dirname, 'your-file.pdf'))
// ============================================================================

// Generate Interview Preparation Guide PDF
app.get('/api/pdf/interview-guide', (req, res) => {
  const doc = new PDFDocument();
  const filename = 'interview-preparation-guide.pdf';
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  doc.pipe(res);
  
  // ============================================================================
  // REPLACE THIS SECTION WITH YOUR OWN PDF CONTENT
  // ============================================================================
  
  // Add content to PDF
  doc.fontSize(24).text('Complete Interview Preparation Guide', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('Technical Interview Preparation', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('1. Data Structures & Algorithms');
  doc.fontSize(10).text('   • Arrays, Strings, Linked Lists');
  doc.fontSize(10).text('   • Trees, Graphs, Dynamic Programming');
  doc.fontSize(10).text('   • Time & Space Complexity Analysis');
  doc.moveDown();
  doc.fontSize(12).text('2. System Design');
  doc.fontSize(10).text('   • Scalability, Load Balancing');
  doc.fontSize(10).text('   • Database Design, Caching');
  doc.fontSize(10).text('   • Microservices Architecture');
  doc.moveDown();
  doc.fontSize(12).text('3. Programming Languages');
  doc.fontSize(10).text('   • Java, Python, JavaScript');
  doc.fontSize(10).text('   • Object-Oriented Programming');
  doc.fontSize(10).text('   • Design Patterns');
  doc.moveDown();
  doc.fontSize(12).text('4. Database & SQL');
  doc.fontSize(10).text('   • Relational Databases');
  doc.fontSize(10).text('   • SQL Queries, Indexing');
  doc.fontSize(10).text('   • NoSQL Databases');
  doc.moveDown();
  doc.fontSize(12).text('5. Operating Systems');
  doc.fontSize(10).text('   • Process Management');
  doc.fontSize(10).text('   • Memory Management');
  doc.fontSize(10).text('   • File Systems');
  doc.moveDown();
  doc.fontSize(12).text('6. Computer Networks');
  doc.fontSize(10).text('   • TCP/IP Protocol');
  doc.fontSize(10).text('   • HTTP, HTTPS, DNS');
  doc.fontSize(10).text('   • Network Security');
  
  // ============================================================================
  // END OF REPLACEABLE CONTENT
  // ============================================================================
  
  doc.end();
});

// Generate System Design Handbook PDF
app.get('/api/pdf/system-design', (req, res) => {
  const doc = new PDFDocument();
  const filename = 'system-design-handbook.pdf';
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  doc.pipe(res);
  
  // ============================================================================
  // REPLACE THIS SECTION WITH YOUR OWN PDF CONTENT
  // ============================================================================
  
  // Add content to PDF
  doc.fontSize(24).text('System Design Interview Handbook', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('Key Concepts', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('1. Scalability');
  doc.fontSize(10).text('   • Horizontal vs Vertical Scaling');
  doc.fontSize(10).text('   • Load Balancing Strategies');
  doc.fontSize(10).text('   • Database Sharding');
  doc.moveDown();
  doc.fontSize(12).text('2. High Availability');
  doc.fontSize(10).text('   • Fault Tolerance');
  doc.fontSize(10).text('   • Redundancy & Replication');
  doc.fontSize(10).text('   • Disaster Recovery');
  doc.moveDown();
  doc.fontSize(12).text('3. Performance');
  doc.fontSize(10).text('   • Caching Strategies');
  doc.fontSize(10).text('   • CDN Implementation');
  doc.fontSize(10).text('   • Database Optimization');
  doc.moveDown();
  doc.fontSize(12).text('4. Security');
  doc.fontSize(10).text('   • Authentication & Authorization');
  doc.fontSize(10).text('   • Data Encryption');
  doc.fontSize(10).text('   • API Security');
  doc.moveDown();
  doc.fontSize(12).text('5. Common System Design Patterns');
  doc.fontSize(10).text('   • Microservices Architecture');
  doc.fontSize(10).text('   • Event-Driven Architecture');
  doc.fontSize(10).text('   • CQRS Pattern');
  
  // ============================================================================
  // END OF REPLACEABLE CONTENT
  // ============================================================================
  
  doc.end();
});

// Generate DSA Cheat Sheet PDF
app.get('/api/pdf/dsa-cheatsheet', (req, res) => {
  const doc = new PDFDocument();
  const filename = 'dsa-cheatsheet.pdf';
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  doc.pipe(res);
  
  // Add content to PDF
  doc.fontSize(24).text('DSA Cheat Sheet', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('Data Structures', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('Arrays & Strings');
  doc.fontSize(10).text('   • Two Pointers Technique');
  doc.fontSize(10).text('   • Sliding Window');
  doc.fontSize(10).text('   • Binary Search');
  doc.moveDown();
  doc.fontSize(12).text('Linked Lists');
  doc.fontSize(10).text('   • Fast & Slow Pointers');
  doc.fontSize(10).text('   • Reverse Operations');
  doc.fontSize(10).text('   • Cycle Detection');
  doc.moveDown();
  doc.fontSize(12).text('Trees');
  doc.fontSize(10).text('   • DFS (Pre/In/Post Order)');
  doc.fontSize(10).text('   • BFS (Level Order)');
  doc.fontSize(10).text('   • Binary Search Trees');
  doc.moveDown();
  doc.fontSize(12).text('Graphs');
  doc.fontSize(10).text('   • DFS & BFS Traversal');
  doc.fontSize(10).text('   • Shortest Path Algorithms');
  doc.fontSize(10).text('   • Topological Sort');
  doc.moveDown();
  doc.fontSize(16).text('Algorithms', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('Dynamic Programming');
  doc.fontSize(10).text('   • Memoization & Tabulation');
  doc.fontSize(10).text('   • Common Patterns');
  doc.fontSize(10).text('   • Optimization Techniques');
  doc.moveDown();
  doc.fontSize(12).text('Greedy Algorithms');
  doc.fontSize(10).text('   • Activity Selection');
  doc.fontSize(10).text('   • Huffman Coding');
  doc.fontSize(10).text('   • Minimum Spanning Tree');
  
  doc.end();
});

// Generate Behavioral Questions PDF
app.get('/api/pdf/behavioral-questions', (req, res) => {
  const doc = new PDFDocument();
  const filename = 'behavioral-interview-questions.pdf';
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  doc.pipe(res);
  
  // Add content to PDF
  doc.fontSize(24).text('Behavioral Interview Questions', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text('Common Questions & Sample Answers', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('1. Tell me about yourself');
  doc.fontSize(10).text('   • Structure: Past, Present, Future');
  doc.fontSize(10).text('   • Focus on relevant experience');
  doc.fontSize(10).text('   • Keep it under 2 minutes');
  doc.moveDown();
  doc.fontSize(12).text('2. Why do you want to work here?');
  doc.fontSize(10).text('   • Research the company');
  doc.fontSize(10).text('   • Connect your values');
  doc.fontSize(10).text('   • Show enthusiasm');
  doc.moveDown();
  doc.fontSize(12).text('3. Describe a challenging project');
  doc.fontSize(10).text('   • Use STAR method');
  doc.fontSize(10).text('   • Focus on problem-solving');
  doc.fontSize(10).text('   • Show leadership skills');
  doc.moveDown();
  doc.fontSize(12).text('4. How do you handle conflict?');
  doc.fontSize(10).text('   • Stay professional');
  doc.fontSize(10).text('   • Focus on resolution');
  doc.fontSize(10).text('   • Show communication skills');
  doc.moveDown();
  doc.fontSize(12).text('5. Where do you see yourself in 5 years?');
  doc.fontSize(10).text('   • Show ambition');
  doc.fontSize(10).text('   • Align with company goals');
  doc.fontSize(10).text('   • Be realistic');
  doc.moveDown();
  doc.fontSize(12).text('6. What are your strengths and weaknesses?');
  doc.fontSize(10).text('   • Strengths: Relevant to role');
  doc.fontSize(10).text('   • Weaknesses: Show growth');
  doc.fontSize(10).text('   • Demonstrate self-awareness');
  
  doc.end();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'PDF Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  - /api/pdf/interview-guide');
  console.log('  - /api/pdf/system-design');
  console.log('  - /api/pdf/dsa-cheatsheet');
  console.log('  - /api/pdf/behavioral-questions');
}); 