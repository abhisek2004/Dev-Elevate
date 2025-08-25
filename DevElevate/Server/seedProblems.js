import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Problem } from './model/Problem.js';

dotenv.config();

const sampleProblems = [
    {
        title: 'Two Sum',
        description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: 'Easy',
        category: 'Array',
        tags: ['Array', 'Hash Table'],
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
            },
            {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]'
            }
        ],
        constraints: [
            '2 ≤ nums.length ≤ 10⁴',
            '-10⁹ ≤ nums[i] ≤ 10⁹',
            '-10⁹ ≤ target ≤ 10⁹',
            'Only one valid answer exists.'
        ],
        testCases: [
            {
                id: '1',
                input: '[2,7,11,15]\n9',
                expectedOutput: '[0,1]',
                hidden: false
            },
            {
                id: '2',
                input: '[3,2,4]\n6',
                expectedOutput: '[1,2]',
                hidden: false
            },
            {
                id: '3',
                input: '[3,3]\n6',
                expectedOutput: '[0,1]',
                hidden: true
            }
        ],
        acceptance: 47.8,
        submissions: 4250000,
        starterCode: {
            python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass`,
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize){
    
}`
        },
        timeLimit: 1000,
        memoryLimit: 128
    },
    {
        title: 'Reverse Integer',
        description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**`,
        difficulty: 'Medium',
        category: 'Math',
        tags: ['Math'],
        examples: [
            {
                input: 'x = 123',
                output: '321'
            },
            {
                input: 'x = -123',
                output: '-321'
            },
            {
                input: 'x = 120',
                output: '21'
            }
        ],
        constraints: [
            '-2³¹ ≤ x ≤ 2³¹ - 1'
        ],
        testCases: [
            {
                id: '1',
                input: '123',
                expectedOutput: '321',
                hidden: false
            },
            {
                id: '2',
                input: '-123',
                expectedOutput: '-321',
                hidden: false
            },
            {
                id: '3',
                input: '120',
                expectedOutput: '21',
                hidden: false
            },
            {
                id: '4',
                input: '1534236469',
                expectedOutput: '0',
                hidden: true
            }
        ],
        acceptance: 27.5,
        submissions: 2100000,
        starterCode: {
            python: `def reverse(x):
    """
    :type x: int
    :rtype: int
    """
    pass`,
            javascript: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
};`,
            java: `class Solution {
    public int reverse(int x) {
        
    }
}`,
            cpp: `class Solution {
public:
    int reverse(int x) {
        
    }
};`,
            c: `int reverse(int x){
    
}`
        },
        timeLimit: 1000,
        memoryLimit: 128
    },
    {
        title: 'Valid Parentheses',
        description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: 'Easy',
        category: 'Stack',
        tags: ['Stack', 'String'],
        examples: [
            {
                input: 's = "()"',
                output: 'true'
            },
            {
                input: 's = "()[]{}"',
                output: 'true'
            },
            {
                input: 's = "(]"',
                output: 'false'
            }
        ],
        constraints: [
            '1 ≤ s.length ≤ 10⁴',
            's consists of parentheses only \'()[]{}\''
        ],
        testCases: [
            {
                id: '1',
                input: '()',
                expectedOutput: 'true',
                hidden: false
            },
            {
                id: '2',
                input: '()[]{}',
                expectedOutput: 'true',
                hidden: false
            },
            {
                id: '3',
                input: '(]',
                expectedOutput: 'false',
                hidden: false
            },
            {
                id: '4',
                input: '([)]',
                expectedOutput: 'false',
                hidden: true
            }
        ],
        acceptance: 40.2,
        submissions: 3800000,
        starterCode: {
            python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    pass`,
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
            java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
            cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
            c: `bool isValid(char* s) {
    
}`
        },
        timeLimit: 1000,
        memoryLimit: 128
    }
];

const seedProblems = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing problems
        await Problem.deleteMany({});
        console.log('Cleared existing problems');

        // Insert sample problems
        const insertedProblems = await Problem.insertMany(sampleProblems);
        console.log(`Inserted ${insertedProblems.length} problems`);

        // Display inserted problems
        insertedProblems.forEach(problem => {
            console.log(`- ${problem.title} (${problem.difficulty})`);
        });

        console.log('\nDatabase seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedProblems();
