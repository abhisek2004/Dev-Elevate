export interface Flashcard {
  id: number;
  term: string;
  explanation: string;
  difficulty: 'Basic' | 'Intermediate';
  category: string;
}

export const flashcards: Flashcard[] = [
  // Time Complexity
  {
    id: 1,
    term: "Big-O Notation",
    explanation: "Mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It represents the upper bound of algorithmic complexity.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 2,
    term: "O(1) - Constant Time",
    explanation: "Algorithm takes the same amount of time regardless of input size. Examples: array access, hash table lookup, stack push/pop.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 3,
    term: "O(log n) - Logarithmic Time",
    explanation: "Time grows logarithmically with input size. Common in divide-and-conquer algorithms like binary search, balanced tree operations.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 4,
    term: "O(n) - Linear Time",
    explanation: "Time grows linearly with input size. Examples: single loop through array, linear search, traversing a linked list.",
    difficulty: "Basic",
    category: "Time Complexity"
  },
  {
    id: 5,
    term: "O(n²) - Quadratic Time",
    explanation: "Time grows quadratically with input size. Common in nested loops, bubble sort, selection sort, insertion sort.",
    difficulty: "Basic",
    category: "Time Complexity"
  },

  // Graph Traversals
  {
    id: 6,
    term: "DFS (Depth-First Search)",
    explanation: "Graph traversal algorithm that explores as far as possible along each branch before backtracking. Uses stack (recursion or explicit). Time: O(V+E), Space: O(V).",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },
  {
    id: 7,
    term: "BFS (Breadth-First Search)",
    explanation: "Graph traversal algorithm that explores all neighbors at current depth before moving to next depth level. Uses queue. Time: O(V+E), Space: O(V). Finds shortest path in unweighted graphs.",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },
  {
    id: 8,
    term: "Topological Sort",
    explanation: "Linear ordering of vertices in a directed acyclic graph (DAG) where for every directed edge (u,v), vertex u comes before v. Used in scheduling, dependency resolution.",
    difficulty: "Intermediate",
    category: "Graph Traversals"
  },

  // Sorting Algorithms
  {
    id: 9,
    term: "Merge Sort",
    explanation: "Divide-and-conquer stable sorting algorithm. Divides array into halves, recursively sorts them, then merges. Time: O(n log n), Space: O(n). Always O(n log n) regardless of input.",
    difficulty: "Intermediate",
    category: "Sorting"
  },
  {
    id: 10,
    term: "Quick Sort",
    explanation: "Divide-and-conquer sorting algorithm using pivot partitioning. Average: O(n log n), Worst: O(n²), Space: O(log n). In-place but not stable.",
    difficulty: "Intermediate",
    category: "Sorting"
  },
  {
    id: 11,
    term: "Heap Sort",
    explanation: "Comparison-based sorting using binary heap. Build max-heap, then repeatedly extract maximum. Time: O(n log n), Space: O(1). In-place but not stable.",
    difficulty: "Intermediate",
    category: "Sorting"
  },
  {
    id: 12,
    term: "Bubble Sort",
    explanation: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order, pushing larger elements to the end. It's simple but inefficient with O(n²) time complexity.",
    difficulty: "Basic",
    category: "Sorting"
  },
  {
    id: 13,
    term: "Selection Sort",
    explanation: "Selection sort repeatedly finds the smallest element from the unsorted part and swaps it with the first unsorted element, building a sorted list from left to right.",
    difficulty: "Basic",
    category: "Sorting"
  },
   {
    id: 14,
    term: "Insertion Sort",
    explanation: "Insertion Sort builds the sorted list one element at a time by inserting each new element into its correct position among the already sorted ones.",
    difficulty: "Basic",
    category: "Sorting"
  },
  

  // Data Structures
  {
    id: 15,
    term: "Hash Table",
    explanation: "Data structure that maps keys to values using hash function. Average O(1) for search, insert, delete. Handles collisions via chaining or open addressing.",
    difficulty: "Basic",
    category: "Data Structures"
  },
  {
    id: 16,
    term: "Binary Search Tree (BST)",
    explanation: "Binary tree where left subtree contains nodes with keys less than parent, right subtree contains greater keys. Average O(log n) operations, worst O(n) if unbalanced.",
    difficulty: "Intermediate",
    category: "Data Structures"
  },
  {
    id: 17,
    term: "Heap",
    explanation: "Complete binary tree satisfying heap property. Max-heap: parent ≥ children, Min-heap: parent ≤ children. Used in priority queues, heap sort. Insert/delete: O(log n).",
    difficulty: "Intermediate",
    category: "Data Structures"
  },
  {
    id: 18,
    term: "Linked List",
    explanation: "A linked list is a linear data structure where elements (nodes) are connected using pointers, with each node containing data and a reference to the next (and sometimes previous) node.",
    difficulty: "Basic",
    category: "Data Structures"
  },
  {
    id: 19,
    term: "Stack",
    explanation: "A stack is a linear data structure that follows the LIFO (Last In, First Out) principle, where insertion and deletion happen only at the top.",
    difficulty: "Basic",
    category: "Data Structures"
  },
  {
    id: 20,
    term: "Queue",
    explanation: "A queue is a linear data structure that follows the FIFO (First In, First Out) principle, where elements are added at the rear and removed from the front.",
    difficulty: "Basic",
    category: "Data Structures"
  },
  
  // Recursion
  {
    id: 21,
    term: "Recursion",
    explanation: "Problem-solving technique where function calls itself with smaller subproblems. Requires base case and recursive case. Can lead to stack overflow if not properly bounded.",
    difficulty: "Basic",
    category: "Recursion"
  },
  {
    id: 22,
    term: "Dynamic Programming",
    explanation: "Optimization technique that solves complex problems by breaking them into simpler subproblems and storing results. Avoids redundant calculations. Two approaches: memoization (top-down) and tabulation (bottom-up).",
    difficulty: "Intermediate",
    category: "Recursion"
  },
  {
    id: 23,
    term: "Backtracking",
    explanation: "Algorithmic approach that considers searching every possible combination to solve computational problems. Builds solution incrementally and abandons candidates that cannot lead to valid solution.",
    difficulty: "Intermediate",
    category: "Recursion"
  },
  {
    id: 24,
    term: "Tail Recursion",
    explanation: "Tail recursion is a type of recursion where the recursive call is the last operation in the function, allowing some compilers to optimize and reuse stack frames.",
    difficulty: "Intermediate",
    category: "Recursion"
  },
  {
    id: 25,
    term: "Base Condition",
    explanation: "A base condition is the stopping criterion in a recursive function that prevents infinite recursion by providing a direct answer for simple cases.",
    difficulty: "Basic",
    category: "Recursion"
  },

  //Trees

  {
    id: 26,
    term: "Binary Trees",
    explanation: "A tree where each node has at most two children, commonly called left and right.",
    difficulty: "Basic",
    category: "Trees"
  },

  {
    id: 27,
    term: "AVL Trees",
    explanation: "A self-balancing binary search tree where the height difference between left and right subtrees of any node is at most 1.",
    difficulty: "Basic",
    category: "Trees"
  },

  {
    id: 28,
    term: "Red-Black Trees",
    explanation: "Self-balancing BST where each node has a color (red or black) and specific rules ensure balanced height for efficient operations.",
    difficulty: "Basic",
    category: "Trees"
  },

  {
    id: 29,
    term: "Segment Trees",
    explanation: "A tree used for range queries and updates on arrays, storing aggregate information (like sum or min) in each node.",
    difficulty: "Basic",
    category: "Trees"
  },

  {
    id: 30,
    term: "Trie (Prefix Tree)",
    explanation: "A tree-like structure used to store strings, where each node represents a character, enabling fast prefix-based searches.",
    difficulty: "Intermediate",
    category: "Trees"
  },

  //Algorithms (Graphs)

  {
    id: 31,
    term: "Dijkstra's Algorithm",
    explanation: "An algorithm to find the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edges.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

  {
    id: 32,
    term: "Bellman-Ford Algorithm",
    explanation: "An algorithm to find shortest paths from a source vertex in a weighted graph, capable of handling negative weights.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

  {
    id: 33,
    term: "Floyd-Warshall Algorithm",
    explanation: "An algorithm to find shortest paths between all pairs of vertices in a weighted graph.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

   {
    id: 34,
    term: "Kruskal's Algorithm",
    explanation: "A greedy algorithm to find a minimum spanning tree of a connected, weighted graph by choosing edges in increasing order of weight.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

 {
    id: 35,
    term: "Prim's Algorithm",
    explanation: "A greedy algorithm to find a minimum spanning tree by starting from a vertex and repeatedly adding the smallest edge connecting the tree to a new vertex.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

  {
    id: 36,
    term: "Bit Manipulation",
    explanation: "Techniques to perform operations on integers at the binary level using AND, OR, XOR, shifts, etc.",
    difficulty: "Intermediate",
    category: "Algorithms"
  },

//Advanced Data Structure

 {
    id: 37,
    term: "Fenwick Tree (Binary Indexed Tree)",
    explanation: "A data structure that efficiently supports prefix sum queries and updates in logarithmic time.",
    difficulty: "Intermediate",
    category: "Advanced Data Structure"
  },
 
  {
    id: 38,
    term: "Union-Find (Disjoint Set)",
    explanation: "A data structure to keep track of disjoint sets and efficiently perform union and find operations.",
    difficulty: "Intermediate",
    category: "Advanced Data Structure"
  },

   {
    id: 39,
    term: "Skip List",
    explanation: "A layered linked list with multiple levels that allows fast search, insertion, and deletion in O(log n) expected time.",
    difficulty: "Intermediate",
    category: "Advanced Data Structure"
  },

  {
    id: 40,
    term: "Suffix Tree",
    explanation: "A compressed trie containing all the suffixes of a given string, used for fast pattern matching and string queries.",
    difficulty: "Intermediate",
    category: "Advanced Data Structure"
  },

  //Miscellaneous

  {
    id: 41,
    term: "Kadane's Algorithm",
    explanation: "An efficient method to find the maximum sum subarray in a 1D array using dynamic programming principles.",
    difficulty: "Basic",
    category: "Miscellaneous"
  },

    {
    id: 42,
    term: "Mo's Algorithm",
    explanation: "A technique to answer offline range queries on arrays efficiently by sorting queries and using a sliding window approach.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

    {
    id: 43,
    term: "Sliding Window Technique",
    explanation: "A method to solve array/string problems by maintaining a window of elements and moving it across the data.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

    {
    id: 44,
    term: "Two Pointers Technique",
    explanation: "An approach using two indices to traverse an array or string simultaneously to solve problems efficiently.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

    {
    id: 45,
    term: "Huffman Encoding",
    explanation: "A greedy algorithm for compressing data by building a binary tree based on character frequencies to minimize encoding length.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

   {
    id: 46,
    term: "Articulation Point",
    explanation: "A vertex in a graph whose removal increases the number of connected components.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

   {
    id: 47,
    term: "Kosaraju's Algorithm",
    explanation: "An algorithm to find strongly connected components in a directed graph using two DFS passes.",
    difficulty: "Intermediate",
    "category": "Miscellaneous"
  },

   {
     id: 48,
    term: "Tarjan's Algorithm",
    explanation: "A DFS-based algorithm to find strongly connected components or articulation points in a graph efficiently.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

   {
    id: 49,
    term: "Suffix Array",
    explanation: "An array of all sorted suffixes of a string, used for efficient pattern searching and string processing.",
    difficulty: "Intermediate",
    category: "Miscellaneous"
  },

   {
     id: 50,
    term: "Priority Queue",
    explanation: "A queue where each element has a priority, and elements with higher priority are served before lower priority ones.",
    difficulty: "Basic",
    category: "Miscellaneous"
  }
];

export const categories = [
  "All",
  "Time Complexity", 
  "Graph Traversals",
  "Sorting",
  "Data Structures",
  "Recursion",
  "Trees",
  "Algorithms",
  "Advanced Data Structure",
  "Miscellaneous"
] as const;

export const difficulties = ["All", "Basic", "Intermediate"] as const;
