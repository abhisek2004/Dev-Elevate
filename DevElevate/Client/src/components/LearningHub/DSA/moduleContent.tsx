export const dsaModules = {
  arrays: {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master array fundamentals, two pointers technique, and sliding window patterns',
    topics: [
      {
        id: 'array-basics',
        title: 'Array Basics',
        content: `# Array Fundamentals

## What are Arrays?
Arrays store elements of the same data type in contiguous memory locations with constant-time access by index.

### Key Properties:
- **Fixed size** (in most languages)
- **Zero-based indexing**
- **O(1) random access** by index
- **Cache-friendly** memory layout

## Array Operations & Time Complexity

| Operation | Time | Description |
|-----------|------|-------------|
| Access | O(1) | Direct index access |
| Search | O(n) | Linear search |
| Insert | O(n) | Shift elements |
| Delete | O(n) | Shift elements |

## Common Patterns

### Traversal:
\`\`\`java
for (int i = 0; i < arr.length; i++) {
    process(arr[i]);
}
\`\`\`

### Frequency Counting:
\`\`\`java
Map<Integer, Integer> freq = new HashMap<>();
for (int num : arr) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}
\`\`\``,
        codeExample: `public class ArrayBasics {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};
        
        // Linear search
        int target = 8;
        int index = linearSearch(numbers, target);
        System.out.println("Index of " + target + ": " + index);
        
        // Find min and max
        int[] result = findMinMax(numbers);
        System.out.println("Min: " + result[0] + ", Max: " + result[1]);
    }
    
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
    
    public static int[] findMinMax(int[] arr) {
        int min = arr[0], max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            min = Math.min(min, arr[i]);
            max = Math.max(max, arr[i]);
        }
        return new int[]{min, max};
    }
}`,
        practiceLinks: [
          { name: 'LeetCode Arrays', url: 'https://leetcode.com/tag/array/' },
          { name: 'GeeksforGeeks Arrays', url: 'https://www.geeksforgeeks.org/array-data-structure/' }
        ]
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        content: `# Two Pointers Technique

## What is Two Pointers?
Two pointers technique uses two pointers to traverse data structures efficiently.

### When to Use:
- **Sorted arrays** - Finding pairs, triplets
- **Palindrome checking** - Start and end comparison
- **Sliding window problems** - Variable window size

## Common Patterns

### Pattern 1: Two Sum in Sorted Array
\`\`\`java
public int[] twoSum(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            return new int[]{left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}
\`\`\`

### Pattern 2: Palindrome Check
\`\`\`java
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
\`\`\``,
        codeExample: `public class TwoPointers {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 6, 8, 9};
        int target = 13;
        int[] result = twoSum(arr, target);
        System.out.println("Indices: " + Arrays.toString(result));
    }
    
    public static int[] twoSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{-1, -1};
    }
}`,
        practiceLinks: [
          { name: 'Two Pointers LeetCode', url: 'https://leetcode.com/tag/two-pointers/' },
          { name: 'GeeksforGeeks Two Pointers', url: 'https://www.geeksforgeeks.org/two-pointers-technique/' }
        ]
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        content: `# Sliding Window Technique

## What is Sliding Window?
Sliding window maintains a window of elements and slides it across data structures.

### Types:
1. **Fixed Size Window** - Constant window size
2. **Variable Size Window** - Dynamic window size

## Fixed Window Pattern
\`\`\`java
public int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    
    // Calculate sum of first window
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
\`\`\`

## Variable Window Pattern
\`\`\`java
public int longestSubstring(String s) {
    Set<Character> window = new HashSet<>();
    int left = 0, maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (window.contains(s.charAt(right))) {
            window.remove(s.charAt(left));
            left++;
        }
        window.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
\`\`\``,
        codeExample: `public class SlidingWindow {
    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        int k = 3;
        System.out.println("Max sum: " + maxSumSubarray(arr, k));
        
        String s = "abcabcbb";
        System.out.println("Longest substring: " + lengthOfLongestSubstring(s));
    }
    
    public static int maxSumSubarray(int[] arr, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        int maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
    
    public static int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0, maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            while (window.contains(s.charAt(right))) {
                window.remove(s.charAt(left));
                left++;
            }
            window.add(s.charAt(right));
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}`,
        practiceLinks: [
          { name: 'Sliding Window LeetCode', url: 'https://leetcode.com/tag/sliding-window/' },
          { name: 'GeeksforGeeks Sliding Window', url: 'https://www.geeksforgeeks.org/window-sliding-technique/' }
        ]
      }
    ]
  },
  strings: {
    id: 'strings',
    title: 'Strings',
    description: 'Master string manipulation, pattern matching, and advanced string algorithms',
    topics: [
      {
        id: 'string-manipulation',
        title: 'String Manipulation',
        content: `# String Manipulation

## String Basics
Strings are sequences of characters with various operations for manipulation.

### Common Operations:
- **Length**: s.length()
- **Character Access**: s.charAt(i)
- **Substring**: s.substring(start, end)
- **Concatenation**: s1 + s2

## String Methods
\`\`\`java
String s = "Hello World";
s.toLowerCase();     // "hello world"
s.toUpperCase();     // "HELLO WORLD"
s.trim();           // Remove whitespace
s.replace('l', 'x'); // "Hexxo Worxd"
s.split(" ");       // ["Hello", "World"]
\`\`\``,
        codeExample: `public class StringManipulation {
    public static void main(String[] args) {
        String s = "Hello World";
        System.out.println("Original: " + s);
        System.out.println("Length: " + s.length());
        System.out.println("Uppercase: " + s.toUpperCase());
        System.out.println("Reversed: " + reverse(s));
    }
    
    public static String reverse(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            sb.append(s.charAt(i));
        }
        return sb.toString();
    }
}`,
        practiceLinks: [
          { name: 'String Problems LeetCode', url: 'https://leetcode.com/tag/string/' },
          { name: 'GeeksforGeeks Strings', url: 'https://www.geeksforgeeks.org/string-data-structure/' }
        ]
      },
      {
        id: 'pattern-matching',
        title: 'Pattern Matching',
        content: `# Pattern Matching

## Naive Pattern Matching
Simple approach to find pattern in text with O(nm) complexity.

\`\`\`java
public boolean naiveSearch(String text, String pattern) {
    for (int i = 0; i <= text.length() - pattern.length(); i++) {
        int j = 0;
        while (j < pattern.length() && text.charAt(i + j) == pattern.charAt(j)) {
            j++;
        }
        if (j == pattern.length()) return true;
    }
    return false;
}
\`\`\`

## Rabin-Karp Algorithm
Uses rolling hash for efficient pattern matching.

\`\`\`java
public int rabinKarp(String text, String pattern) {
    int prime = 101;
    int patternHash = 0, textHash = 0;
    int h = 1;
    
    for (int i = 0; i < pattern.length() - 1; i++) {
        h = (h * 256) % prime;
    }
    
    for (int i = 0; i < pattern.length(); i++) {
        patternHash = (256 * patternHash + pattern.charAt(i)) % prime;
        textHash = (256 * textHash + text.charAt(i)) % prime;
    }
    
    for (int i = 0; i <= text.length() - pattern.length(); i++) {
        if (patternHash == textHash) {
            if (text.substring(i, i + pattern.length()).equals(pattern)) {
                return i;
            }
        }
        
        if (i < text.length() - pattern.length()) {
            textHash = (256 * (textHash - text.charAt(i) * h) + text.charAt(i + pattern.length())) % prime;
            if (textHash < 0) textHash += prime;
        }
    }
    return -1;
}
\`\`\``,
        codeExample: `public class PatternMatching {
    public static void main(String[] args) {
        String text = "ABABDABACDABABCABCABCABCABC";
        String pattern = "ABABCABCABCABC";
        
        int result = naiveSearch(text, pattern);
        System.out.println("Pattern found at index: " + result);
        
        result = rabinKarp(text, pattern);
        System.out.println("Rabin-Karp found at: " + result);
    }
    
    public static int naiveSearch(String text, String pattern) {
        for (int i = 0; i <= text.length() - pattern.length(); i++) {
            int j = 0;
            while (j < pattern.length() && text.charAt(i + j) == pattern.charAt(j)) {
                j++;
            }
            if (j == pattern.length()) return i;
        }
        return -1;
    }
    
    public static int rabinKarp(String text, String pattern) {
        int prime = 101;
        int patternHash = 0, textHash = 0;
        int h = 1;
        
        for (int i = 0; i < pattern.length() - 1; i++) {
            h = (h * 256) % prime;
        }
        
        for (int i = 0; i < pattern.length(); i++) {
            patternHash = (256 * patternHash + pattern.charAt(i)) % prime;
            textHash = (256 * textHash + text.charAt(i)) % prime;
        }
        
        for (int i = 0; i <= text.length() - pattern.length(); i++) {
            if (patternHash == textHash) {
                if (text.substring(i, i + pattern.length()).equals(pattern)) {
                    return i;
                }
            }
            
            if (i < text.length() - pattern.length()) {
                textHash = (256 * (textHash - text.charAt(i) * h) + text.charAt(i + pattern.length())) % prime;
                if (textHash < 0) textHash += prime;
            }
        }
        return -1;
    }
}`,
        practiceLinks: [
          { name: 'Pattern Matching LeetCode', url: 'https://leetcode.com/tag/string-matching/' },
          { name: 'Rabin-Karp Algorithm', url: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/' }
        ]
      },
      {
        id: 'kmp-algorithm',
        title: 'KMP Algorithm',
        content: `# KMP (Knuth-Morris-Pratt) Algorithm

## Overview
Efficient string matching algorithm with O(n+m) time complexity using failure function.

## Key Concepts
- **Failure Function**: Preprocesses pattern to avoid redundant comparisons
- **No Backtracking**: Never moves backward in text
- **Linear Time**: O(n+m) where n is text length, m is pattern length

## Algorithm Steps
1. **Preprocess**: Build failure function for pattern
2. **Search**: Use failure function to skip characters efficiently

\`\`\`java
public int[] computeLPS(String pattern) {
    int[] lps = new int[pattern.length()];
    int len = 0;
    int i = 1;
    
    while (i < pattern.length()) {
        if (pattern.charAt(i) == pattern.charAt(len)) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

public int KMPSearch(String text, String pattern) {
    int[] lps = computeLPS(pattern);
    int i = 0, j = 0;
    
    while (i < text.length()) {
        if (pattern.charAt(j) == text.charAt(i)) {
            i++;
            j++;
        }
        
        if (j == pattern.length()) {
            return i - j; // Found at index i-j
        } else if (i < text.length() && pattern.charAt(j) != text.charAt(i)) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1;
}
\`\`\``,
        codeExample: `public class KMPAlgorithm {
    public static void main(String[] args) {
        String text = "ABABDABACDABABCABCABCABCABC";
        String pattern = "ABABCABCABCABC";
        
        int result = KMPSearch(text, pattern);
        if (result != -1) {
            System.out.println("Pattern found at index: " + result);
        } else {
            System.out.println("Pattern not found");
        }
        
        // Show LPS array
        int[] lps = computeLPS(pattern);
        System.out.println("LPS Array: " + Arrays.toString(lps));
    }
    
    public static int[] computeLPS(String pattern) {
        int[] lps = new int[pattern.length()];
        int len = 0;
        int i = 1;
        
        while (i < pattern.length()) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
    
    public static int KMPSearch(String text, String pattern) {
        int[] lps = computeLPS(pattern);
        int i = 0, j = 0;
        
        while (i < text.length()) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++;
                j++;
            }
            
            if (j == pattern.length()) {
                return i - j;
            } else if (i < text.length() && pattern.charAt(j) != text.charAt(i)) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        return -1;
    }
}`,
        practiceLinks: [
          { name: 'KMP Algorithm LeetCode', url: 'https://leetcode.com/problems/implement-strstr/' },
          { name: 'GeeksforGeeks KMP', url: 'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/' }
        ]
      }
    ]
  },
  linkedlist: {
    id: 'linkedlist',
    title: 'Linked Lists',
    description: 'Master linked list operations, traversal, and advanced techniques',
    topics: [
      {
        id: 'singly-linked-list',
        title: 'Singly Linked List',
        content: `# Singly Linked List

## What is a Linked List?
A linear data structure where elements are stored in nodes, each containing data and a reference to the next node.

### Structure:
\`\`\`java
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}
\`\`\`

## Basic Operations
- **Insert**: Add node at beginning, end, or middle
- **Delete**: Remove node by value or position
- **Search**: Find node with specific value
- **Traverse**: Visit all nodes in sequence`,
        codeExample: `class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
    }
}

public class LinkedList {
    private ListNode head;
    
    public void insert(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        head = newNode;
    }
    
    public void display() {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.insert(3);
        list.insert(2);
        list.insert(1);
        list.display();
    }
}`,
        practiceLinks: [
          { name: 'Linked List LeetCode', url: 'https://leetcode.com/tag/linked-list/' },
          { name: 'GeeksforGeeks Linked List', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' }
        ]
      },
      {
        id: 'doubly-linked-list',
        title: 'Doubly Linked List',
        content: `# Doubly Linked List

## Structure
Each node has references to both next and previous nodes, allowing bidirectional traversal.

\`\`\`java
class DoublyListNode {
    int val;
    DoublyListNode next;
    DoublyListNode prev;
    
    DoublyListNode(int val) {
        this.val = val;
    }
}
\`\`\`

## Advantages
- **Bidirectional traversal**
- **Efficient deletion** when node reference is given
- **Better for certain algorithms** like LRU cache

## Operations
- Insert at beginning: O(1)
- Insert at end: O(1) with tail pointer
- Delete node: O(1) with node reference
- Search: O(n)`,
        codeExample: `class DoublyListNode {
    int val;
    DoublyListNode next, prev;
    
    DoublyListNode(int val) {
        this.val = val;
    }
}

public class DoublyLinkedList {
    private DoublyListNode head, tail;
    
    public void insertFront(int val) {
        DoublyListNode newNode = new DoublyListNode(val);
        if (head == null) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
    }
    
    public void insertEnd(int val) {
        DoublyListNode newNode = new DoublyListNode(val);
        if (tail == null) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
    }
    
    public void display() {
        DoublyListNode current = head;
        while (current != null) {
            System.out.print(current.val + " <-> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.insertFront(2);
        dll.insertFront(1);
        dll.insertEnd(3);
        dll.display();
    }
}`,
        practiceLinks: [
          { name: 'Doubly Linked List Problems', url: 'https://leetcode.com/tag/linked-list/' },
          { name: 'GeeksforGeeks DLL', url: 'https://www.geeksforgeeks.org/doubly-linked-list/' }
        ]
      },
      {
        id: 'circular-linked-list',
        title: 'Circular Linked List',
        content: `# Circular Linked List

## Structure
Last node points back to the first node, forming a circle.

\`\`\`java
class CircularListNode {
    int val;
    CircularListNode next;
    
    CircularListNode(int val) {
        this.val = val;
    }
}
\`\`\`

## Applications
- **Round-robin scheduling**
- **Josephus problem**
- **Circular buffers**
- **Music playlist loops**

## Key Points
- No null pointers
- Traversal needs careful termination condition
- Useful for cyclic operations`,
        codeExample: `class CircularListNode {
    int val;
    CircularListNode next;
    
    CircularListNode(int val) {
        this.val = val;
    }
}

public class CircularLinkedList {
    private CircularListNode head;
    
    public void insert(int val) {
        CircularListNode newNode = new CircularListNode(val);
        if (head == null) {
            head = newNode;
            newNode.next = head;
        } else {
            CircularListNode temp = head;
            while (temp.next != head) {
                temp = temp.next;
            }
            temp.next = newNode;
            newNode.next = head;
        }
    }
    
    public void display() {
        if (head == null) return;
        
        CircularListNode current = head;
        do {
            System.out.print(current.val + " -> ");
            current = current.next;
        } while (current != head);
        System.out.println("(back to " + head.val + ")");
    }
    
    public static void main(String[] args) {
        CircularLinkedList cll = new CircularLinkedList();
        cll.insert(1);
        cll.insert(2);
        cll.insert(3);
        cll.display();
    }
}`,
        practiceLinks: [
          { name: 'Circular Linked List Problems', url: 'https://leetcode.com/problems/linked-list-cycle/' },
          { name: 'GeeksforGeeks CLL', url: 'https://www.geeksforgeeks.org/circular-linked-list/' }
        ]
      }
    ]
  },
  trees: {
    id: 'trees',
    title: 'Trees',
    description: 'Master tree data structures, traversals, and tree algorithms',
    topics: [
      {
        id: 'binary-trees',
        title: 'Binary Trees',
        content: `# Binary Trees

## What is a Binary Tree?
A hierarchical data structure where each node has at most two children: left and right.

### Structure:
\`\`\`java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
    }
}
\`\`\`

## Tree Traversals
- **Inorder**: Left -> Root -> Right
- **Preorder**: Root -> Left -> Right
- **Postorder**: Left -> Right -> Root
- **Level Order**: Breadth-first traversal`,
        codeExample: `class TreeNode {
    int val;
    TreeNode left, right;
    
    TreeNode(int val) {
        this.val = val;
    }
}

public class BinaryTree {
    public void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.val + " ");
            inorder(root.right);
        }
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        BinaryTree tree = new BinaryTree();
        System.out.println("Inorder traversal:");
        tree.inorder(root);
    }
}`,
        practiceLinks: [
          { name: 'Binary Tree LeetCode', url: 'https://leetcode.com/tag/binary-tree/' },
          { name: 'GeeksforGeeks Trees', url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/' }
        ]
      },
      {
        id: 'bst',
        title: 'BST',
        content: `# Binary Search Tree (BST)

## Properties
- **Left subtree** contains nodes with values less than root
- **Right subtree** contains nodes with values greater than root
- **Both subtrees** are also BSTs
- **No duplicate** values allowed

## Operations Time Complexity
- **Search**: O(log n) average, O(n) worst
- **Insert**: O(log n) average, O(n) worst
- **Delete**: O(log n) average, O(n) worst

## BST Operations
\`\`\`java
public TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insert(root.left, val);
    } else if (val > root.val) {
        root.right = insert(root.right, val);
    }
    return root;
}

public boolean search(TreeNode root, int val) {
    if (root == null) return false;
    if (root.val == val) return true;
    
    return val < root.val ? search(root.left, val) : search(root.right, val);
}
\`\`\``,
        codeExample: `class TreeNode {
    int val;
    TreeNode left, right;
    
    TreeNode(int val) {
        this.val = val;
    }
}

public class BST {
    public TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }
        return root;
    }
    
    public boolean search(TreeNode root, int val) {
        if (root == null) return false;
        if (root.val == val) return true;
        
        return val < root.val ? search(root.left, val) : search(root.right, val);
    }
    
    public void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.val + " ");
            inorder(root.right);
        }
    }
    
    public static void main(String[] args) {
        BST bst = new BST();
        TreeNode root = null;
        
        int[] values = {50, 30, 20, 40, 70, 60, 80};
        for (int val : values) {
            root = bst.insert(root, val);
        }
        
        System.out.println("Inorder traversal (sorted):");
        bst.inorder(root);
        
        System.out.println("\nSearch 40: " + bst.search(root, 40));
        System.out.println("Search 90: " + bst.search(root, 90));
    }
}`,
        practiceLinks: [
          { name: 'BST Problems LeetCode', url: 'https://leetcode.com/tag/binary-search-tree/' },
          { name: 'GeeksforGeeks BST', url: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/' }
        ]
      },
      {
        id: 'tree-traversals',
        title: 'Tree Traversals',
        content: `# Tree Traversals

## Depth-First Traversals

### 1. Inorder (Left-Root-Right)
- **Use**: Get sorted order in BST
- **Applications**: Expression evaluation

### 2. Preorder (Root-Left-Right)
- **Use**: Copy/serialize tree
- **Applications**: Prefix expressions

### 3. Postorder (Left-Right-Root)
- **Use**: Delete tree, calculate size
- **Applications**: Postfix expressions

## Breadth-First Traversal

### Level Order
- **Use**: Level-by-level processing
- **Implementation**: Queue-based

\`\`\`java
public void levelOrder(TreeNode root) {
    if (root == null) return;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        System.out.print(node.val + " ");
        
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}
\`\`\``,
        codeExample: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    
    TreeNode(int val) {
        this.val = val;
    }
}

public class TreeTraversals {
    public void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.val + " ");
            inorder(root.right);
        }
    }
    
    public void preorder(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preorder(root.left);
            preorder(root.right);
        }
    }
    
    public void postorder(TreeNode root) {
        if (root != null) {
            postorder(root.left);
            postorder(root.right);
            System.out.print(root.val + " ");
        }
    }
    
    public void levelOrder(TreeNode root) {
        if (root == null) return;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.print(node.val + " ");
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        TreeTraversals tt = new TreeTraversals();
        
        System.out.println("Inorder: ");
        tt.inorder(root);
        
        System.out.println("\nPreorder: ");
        tt.preorder(root);
        
        System.out.println("\nPostorder: ");
        tt.postorder(root);
        
        System.out.println("\nLevel Order: ");
        tt.levelOrder(root);
    }
}`,
        practiceLinks: [
          { name: 'Tree Traversal Problems', url: 'https://leetcode.com/tag/tree/' },
          { name: 'GeeksforGeeks Traversals', url: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' }
        ]
      },
      {
        id: 'avl-trees',
        title: 'AVL Trees',
        content: `# AVL Trees (Self-Balancing BST)

## Properties
- **Height-balanced** binary search tree
- **Balance factor** of each node is -1, 0, or 1
- **Automatic rebalancing** after insertions/deletions
- **Guaranteed O(log n)** operations

## Balance Factor
\`\`\`
Balance Factor = Height(Left Subtree) - Height(Right Subtree)
\`\`\`

## Rotations

### 1. Left Rotation (LL Case)
\`\`\`java
TreeNode leftRotate(TreeNode x) {
    TreeNode y = x.right;
    TreeNode T2 = y.left;
    
    y.left = x;
    x.right = T2;
    
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    
    return y;
}
\`\`\`

### 2. Right Rotation (RR Case)
\`\`\`java
TreeNode rightRotate(TreeNode y) {
    TreeNode x = y.left;
    TreeNode T2 = x.right;
    
    x.right = y;
    y.left = T2;
    
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    
    return x;
}
\`\`\``,
        codeExample: `class AVLNode {
    int val, height;
    AVLNode left, right;
    
    AVLNode(int val) {
        this.val = val;
        this.height = 1;
    }
}

public class AVLTree {
    int height(AVLNode node) {
        return node == null ? 0 : node.height;
    }
    
    int getBalance(AVLNode node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }
    
    AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        return x;
    }
    
    AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        return y;
    }
    
    AVLNode insert(AVLNode node, int val) {
        if (node == null) return new AVLNode(val);
        
        if (val < node.val) {
            node.left = insert(node.left, val);
        } else if (val > node.val) {
            node.right = insert(node.right, val);
        } else {
            return node;
        }
        
        node.height = 1 + Math.max(height(node.left), height(node.right));
        
        int balance = getBalance(node);
        
        // Left Left Case
        if (balance > 1 && val < node.left.val) {
            return rightRotate(node);
        }
        
        // Right Right Case
        if (balance < -1 && val > node.right.val) {
            return leftRotate(node);
        }
        
        // Left Right Case
        if (balance > 1 && val > node.left.val) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // Right Left Case
        if (balance < -1 && val < node.right.val) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        return node;
    }
    
    void preOrder(AVLNode node) {
        if (node != null) {
            System.out.print(node.val + " ");
            preOrder(node.left);
            preOrder(node.right);
        }
    }
    
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        AVLNode root = null;
        
        int[] values = {10, 20, 30, 40, 50, 25};
        for (int val : values) {
            root = tree.insert(root, val);
        }
        
        System.out.println("Preorder traversal of AVL tree:");
        tree.preOrder(root);
    }
}`,
        practiceLinks: [
          { name: 'AVL Tree Problems', url: 'https://leetcode.com/tag/binary-search-tree/' },
          { name: 'GeeksforGeeks AVL', url: 'https://www.geeksforgeeks.org/avl-tree-set-1-insertion/' }
        ]
      }
    ]
  },
  graphs: {
    id: 'graphs',
    title: 'Graphs',
    description: 'Master graph representations, traversals, and shortest path algorithms',
    topics: [
      {
        id: 'graph-representation',
        title: 'Graph Representation',
        content: `# Graph Representation

## What is a Graph?
A collection of vertices (nodes) connected by edges.

### Types:
- **Directed**: Edges have direction
- **Undirected**: Edges are bidirectional
- **Weighted**: Edges have weights
- **Unweighted**: All edges equal

## Representations

### Adjacency Matrix:
\`\`\`java
int[][] adjMatrix = new int[V][V];
// adjMatrix[i][j] = 1 if edge exists
\`\`\`

### Adjacency List:
\`\`\`java
List<List<Integer>> adjList = new ArrayList<>();
// adjList.get(i) contains neighbors of vertex i
\`\`\``,
        codeExample: `import java.util.*;

public class Graph {
    private int V;
    private List<List<Integer>> adjList;
    
    public Graph(int V) {
        this.V = V;
        adjList = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u); // For undirected graph
    }
    
    public void printGraph() {
        for (int i = 0; i < V; i++) {
            System.out.println("Vertex " + i + ": " + adjList.get(i));
        }
    }
    
    public static void main(String[] args) {
        Graph g = new Graph(5);
        g.addEdge(0, 1);
        g.addEdge(0, 4);
        g.addEdge(1, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        g.addEdge(2, 3);
        g.addEdge(3, 4);
        
        g.printGraph();
    }
}`,
        practiceLinks: [
          { name: 'Graph Problems LeetCode', url: 'https://leetcode.com/tag/graph/' },
          { name: 'GeeksforGeeks Graphs', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' }
        ]
      },
      {
        id: 'dfs',
        title: 'DFS',
        content: `# Depth-First Search (DFS)

## Algorithm
Explores as far as possible along each branch before backtracking.

## Implementation Approaches
1. **Recursive**: Uses call stack
2. **Iterative**: Uses explicit stack

## Applications
- **Topological sorting**
- **Cycle detection**
- **Path finding**
- **Connected components**

## Time Complexity: O(V + E)
## Space Complexity: O(V)

\`\`\`java
public void dfsRecursive(int v, boolean[] visited, List<List<Integer>> adj) {
    visited[v] = true;
    System.out.print(v + " ");
    
    for (int neighbor : adj.get(v)) {
        if (!visited[neighbor]) {
            dfsRecursive(neighbor, visited, adj);
        }
    }
}

public void dfsIterative(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Stack<Integer> stack = new Stack<>();
    
    stack.push(start);
    
    while (!stack.isEmpty()) {
        int v = stack.pop();
        
        if (!visited[v]) {
            visited[v] = true;
            System.out.print(v + " ");
            
            for (int neighbor : adj.get(v)) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
}
\`\`\``,
        codeExample: `import java.util.*;

public class DFS {
    private List<List<Integer>> adj;
    private int V;
    
    public DFS(int V) {
        this.V = V;
        adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }
    
    public void dfsRecursive(int v, boolean[] visited) {
        visited[v] = true;
        System.out.print(v + " ");
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                dfsRecursive(neighbor, visited);
            }
        }
    }
    
    public void dfsIterative(int start) {
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int v = stack.pop();
            
            if (!visited[v]) {
                visited[v] = true;
                System.out.print(v + " ");
                
                for (int neighbor : adj.get(v)) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
    
    public static void main(String[] args) {
        DFS graph = new DFS(7);
        
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 5);
        graph.addEdge(2, 6);
        
        System.out.println("DFS Recursive from vertex 0:");
        boolean[] visited = new boolean[7];
        graph.dfsRecursive(0, visited);
        
        System.out.println("\nDFS Iterative from vertex 0:");
        graph.dfsIterative(0);
    }
}`,
        practiceLinks: [
          { name: 'DFS Problems LeetCode', url: 'https://leetcode.com/tag/depth-first-search/' },
          { name: 'GeeksforGeeks DFS', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/' }
        ]
      },
      {
        id: 'bfs',
        title: 'BFS',
        content: `# Breadth-First Search (BFS)

## Algorithm
Explores all vertices at current depth before moving to next depth level.

## Implementation
Uses **Queue** data structure (FIFO)

## Applications
- **Shortest path** in unweighted graphs
- **Level-order traversal**
- **Minimum spanning tree**
- **Bipartite graph checking**

## Time Complexity: O(V + E)
## Space Complexity: O(V)

\`\`\`java
public void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int v = queue.poll();
        System.out.print(v + " ");
        
        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}
\`\`\`

## BFS vs DFS
| Aspect | BFS | DFS |
|--------|-----|-----|
| **Data Structure** | Queue | Stack |
| **Memory** | More | Less |
| **Shortest Path** | Yes | No |
| **Implementation** | Iterative | Recursive/Iterative |`,
        codeExample: `import java.util.*;

public class BFS {
    private List<List<Integer>> adj;
    private int V;
    
    public BFS(int V) {
        this.V = V;
        adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adj.get(u).add(v);
        adj.get(v).add(u);
    }
    
    public void bfs(int start) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            System.out.print(v + " ");
            
            for (int neighbor : adj.get(v)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    public int shortestPath(int start, int end) {
        if (start == end) return 0;
        
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        int[] distance = new int[V];
        
        visited[start] = true;
        queue.offer(start);
        distance[start] = 0;
        
        while (!queue.isEmpty()) {
            int v = queue.poll();
            
            for (int neighbor : adj.get(v)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    distance[neighbor] = distance[v] + 1;
                    queue.offer(neighbor);
                    
                    if (neighbor == end) {
                        return distance[neighbor];
                    }
                }
            }
        }
        return -1; // No path found
    }
    
    public static void main(String[] args) {
        BFS graph = new BFS(7);
        
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 5);
        graph.addEdge(2, 6);
        
        System.out.println("BFS traversal from vertex 0:");
        graph.bfs(0);
        
        System.out.println("\nShortest path from 0 to 6: " + graph.shortestPath(0, 6));
    }
}`,
        practiceLinks: [
          { name: 'BFS Problems LeetCode', url: 'https://leetcode.com/tag/breadth-first-search/' },
          { name: 'GeeksforGeeks BFS', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/' }
        ]
      },
      {
        id: 'shortest-path',
        title: 'Shortest Path',
        content: `# Shortest Path Algorithms

## Dijkstra's Algorithm
Finds shortest path from source to all vertices in **weighted graph** with **non-negative weights**.

### Time Complexity: O((V + E) log V)

\`\`\`java
public int[] dijkstra(int[][] graph, int src) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] visited = new boolean[V];
    
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = true;
        
        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] != 0 && 
                dist[u] != Integer.MAX_VALUE && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    return dist;
}
\`\`\`

## Bellman-Ford Algorithm
Finds shortest path and **detects negative cycles**.

### Time Complexity: O(VE)

\`\`\`java
public boolean bellmanFord(int[][] edges, int V, int src, int[] dist) {
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], weight = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }
    
    // Check for negative cycles
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], weight = edge[2];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    return true;
}
\`\`\``,
        codeExample: `import java.util.*;

public class ShortestPath {
    
    // Dijkstra's Algorithm
    public int[] dijkstra(int[][] graph, int src) {
        int V = graph.length;
        int[] dist = new int[V];
        boolean[] visited = new boolean[V];
        
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        for (int count = 0; count < V - 1; count++) {
            int u = minDistance(dist, visited);
            visited[u] = true;
            
            for (int v = 0; v < V; v++) {
                if (!visited[v] && graph[u][v] != 0 && 
                    dist[u] != Integer.MAX_VALUE && 
                    dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
        return dist;
    }
    
    private int minDistance(int[] dist, boolean[] visited) {
        int min = Integer.MAX_VALUE;
        int minIndex = -1;
        
        for (int v = 0; v < dist.length; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }
    
    // Bellman-Ford Algorithm
    public boolean bellmanFord(List<int[]> edges, int V, int src, int[] dist) {
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], weight = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
        
        // Check for negative cycles
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], weight = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
                return false; // Negative cycle detected
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        ShortestPath sp = new ShortestPath();
        
        // Dijkstra example
        int[][] graph = {
            {0, 4, 0, 0, 0, 0, 0, 8, 0},
            {4, 0, 8, 0, 0, 0, 0, 11, 0},
            {0, 8, 0, 7, 0, 4, 0, 0, 2},
            {0, 0, 7, 0, 9, 14, 0, 0, 0},
            {0, 0, 0, 9, 0, 10, 0, 0, 0},
            {0, 0, 4, 14, 10, 0, 2, 0, 0},
            {0, 0, 0, 0, 0, 2, 0, 1, 6},
            {8, 11, 0, 0, 0, 0, 1, 0, 7},
            {0, 0, 2, 0, 0, 0, 6, 7, 0}
        };
        
        int[] distances = sp.dijkstra(graph, 0);
        System.out.println("Dijkstra distances from vertex 0:");
        for (int i = 0; i < distances.length; i++) {
            System.out.println("Vertex " + i + ": " + distances[i]);
        }
        
        // Bellman-Ford example
        List<int[]> edges = Arrays.asList(
            new int[]{0, 1, -1},
            new int[]{0, 2, 4},
            new int[]{1, 2, 3},
            new int[]{1, 3, 2},
            new int[]{1, 4, 2},
            new int[]{3, 2, 5},
            new int[]{3, 1, 1},
            new int[]{4, 3, -3}
        );
        
        int[] dist = new int[5];
        boolean hasNegativeCycle = !sp.bellmanFord(edges, 5, 0, dist);
        
        System.out.println("\nBellman-Ford distances from vertex 0:");
        if (!hasNegativeCycle) {
            for (int i = 0; i < dist.length; i++) {
                System.out.println("Vertex " + i + ": " + dist[i]);
            }
        } else {
            System.out.println("Graph contains negative cycle");
        }
    }
}`,
        practiceLinks: [
          { name: 'Shortest Path Problems', url: 'https://leetcode.com/tag/shortest-path/' },
          { name: 'Dijkstra Algorithm', url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/' }
        ]
      }
    ]
  },
  dp: {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Master dynamic programming concepts, memoization, and classic DP problems',
    topics: [
      {
        id: 'memoization',
        title: 'Memoization',
        content: `# Memoization (Top-Down DP)

## What is Memoization?
A technique to store results of expensive function calls and return cached result when same inputs occur again.

### Key Concepts:
- **Overlapping Subproblems**: Same subproblems solved multiple times
- **Optimal Substructure**: Optimal solution contains optimal solutions of subproblems
- **Memoization**: Store computed results to avoid recomputation

## Fibonacci Example
\`\`\`java
public int fibonacci(int n, Map<Integer, Integer> memo) {
    if (n <= 1) return n;
    
    if (memo.containsKey(n)) {
        return memo.get(n);
    }
    
    int result = fibonacci(n-1, memo) + fibonacci(n-2, memo);
    memo.put(n, result);
    return result;
}
\`\`\``,
        codeExample: `import java.util.*;

public class Memoization {
    public static void main(String[] args) {
        int n = 10;
        Map<Integer, Integer> memo = new HashMap<>();
        
        System.out.println("Fibonacci(" + n + ") = " + fibonacci(n, memo));
        
        // Climbing stairs problem
        System.out.println("Ways to climb " + n + " stairs: " + climbStairs(n, new HashMap<>()));
    }
    
    public static int fibonacci(int n, Map<Integer, Integer> memo) {
        if (n <= 1) return n;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int result = fibonacci(n-1, memo) + fibonacci(n-2, memo);
        memo.put(n, result);
        return result;
    }
    
    public static int climbStairs(int n, Map<Integer, Integer> memo) {
        if (n <= 2) return n;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int result = climbStairs(n-1, memo) + climbStairs(n-2, memo);
        memo.put(n, result);
        return result;
    }
}`,
        practiceLinks: [
          { name: 'Dynamic Programming LeetCode', url: 'https://leetcode.com/tag/dynamic-programming/' },
          { name: 'GeeksforGeeks DP', url: 'https://www.geeksforgeeks.org/dynamic-programming/' }
        ]
      },
      {
        id: 'tabulation',
        title: 'Tabulation',
        content: `# Tabulation (Bottom-Up DP)

## What is Tabulation?
Builds solution iteratively from smaller subproblems to larger ones using a table (array).

### Characteristics:
- **Bottom-up approach**
- **Iterative implementation**
- **Space optimized** versions possible
- **No recursion overhead**

## Steps:
1. **Initialize** base cases
2. **Fill table** iteratively
3. **Return** final result

\`\`\`java
public int fibonacciTabulation(int n) {
    if (n <= 1) return n;
    
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}
\`\`\`

## Space Optimization
\`\`\`java
public int fibonacciOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    
    for (int i = 2; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
\`\`\``,
        codeExample: `public class Tabulation {
    public static void main(String[] args) {
        int n = 10;
        
        System.out.println("Fibonacci(" + n + ") = " + fibonacciTabulation(n));
        System.out.println("Fibonacci Optimized(" + n + ") = " + fibonacciOptimized(n));
        
        // Coin change problem
        int[] coins = {1, 3, 4};
        int amount = 6;
        System.out.println("Min coins for " + amount + ": " + coinChange(coins, amount));
        
        // Longest Common Subsequence
        String s1 = "ABCDGH";
        String s2 = "AEDFHR";
        System.out.println("LCS length: " + lcs(s1, s2));
    }
    
    public static int fibonacciTabulation(int n) {
        if (n <= 1) return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        
        return dp[n];
    }
    
    public static int fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        int prev2 = 0, prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    public static int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        return dp[m][n];
    }
}`,
        practiceLinks: [
          { name: 'DP Tabulation Problems', url: 'https://leetcode.com/tag/dynamic-programming/' },
          { name: 'GeeksforGeeks Tabulation', url: 'https://www.geeksforgeeks.org/tabulation-vs-memoization/' }
        ]
      },
      {
        id: 'classic-dp-problems',
        title: 'Classic DP Problems',
        content: `# Classic DP Problems

## 1. Knapsack Problem
**Problem**: Maximum value with weight constraint

\`\`\`java
public int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[][] dp = new int[n + 1][W + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    values[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
\`\`\`

## 2. Edit Distance
**Problem**: Minimum operations to convert string A to B

\`\`\`java
public int editDistance(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], 
                    Math.min(dp[i][j-1], dp[i-1][j-1]));
            }
        }
    }
    return dp[m][n];
}
\`\`\`

## 3. Longest Increasing Subsequence
**Problem**: Length of longest increasing subsequence

\`\`\`java
public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Arrays.stream(dp).max().orElse(0);
}
\`\`\``,
        codeExample: `import java.util.*;

public class ClassicDPProblems {
    public static void main(String[] args) {
        // Knapsack problem
        int[] weights = {1, 3, 4, 5};
        int[] values = {1, 4, 5, 7};
        int W = 7;
        System.out.println("Knapsack max value: " + knapsack(weights, values, W));
        
        // Edit distance
        String s1 = "sunday";
        String s2 = "saturday";
        System.out.println("Edit distance: " + editDistance(s1, s2));
        
        // Longest Increasing Subsequence
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS length: " + lengthOfLIS(nums));
        
        // Maximum subarray sum (Kadane's algorithm)
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max subarray sum: " + maxSubarraySum(arr));
        
        // House robber
        int[] houses = {2, 7, 9, 3, 1};
        System.out.println("Max robbery: " + rob(houses));
    }
    
    public static int knapsack(int[] weights, int[] values, int W) {
        int n = weights.length;
        int[][] dp = new int[n + 1][W + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(
                        values[i-1] + dp[i-1][w - weights[i-1]],
                        dp[i-1][w]
                    );
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        return dp[n][W];
    }
    
    public static int editDistance(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j], 
                        Math.min(dp[i][j-1], dp[i-1][j-1]));
                }
            }
        }
        return dp[m][n];
    }
    
    public static int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        return Arrays.stream(dp).max().orElse(0);
    }
    
    public static int maxSubarraySum(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
    
    public static int rob(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = 0;
        int prev1 = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            int current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,
        practiceLinks: [
          { name: 'Classic DP Problems', url: 'https://leetcode.com/tag/dynamic-programming/' },
          { name: 'DP Pattern Problems', url: 'https://www.geeksforgeeks.org/dynamic-programming/' }
        ]
      }
    ]
  }
};