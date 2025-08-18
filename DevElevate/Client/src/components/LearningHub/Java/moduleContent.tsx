export const javaModules = {
  basics: {
    id: 'basics',
    title: 'Java Basics',
    description: 'Master Java fundamentals: JVM architecture, syntax, variables, data types, and I/O operations',
    topics: [
      {
        id: 'jvm-jdk',
        title: 'JVM & JDK Setup',
        content: `# JVM & JDK Complete Guide

## What is Java?
Java is a **high-level, object-oriented, platform-independent** programming language developed by Sun Microsystems (now Oracle) in 1995.

### Key Features:
- **Platform Independent**: "Write Once, Run Anywhere" (WORA)
- **Object-Oriented**: Everything is an object
- **Secure**: Built-in security features
- **Multithreaded**: Supports concurrent programming
- **Robust**: Strong memory management

## Java Architecture

### JVM (Java Virtual Machine)
- **Purpose**: Executes Java bytecode
- **Platform Specific**: Different JVM for each OS
- **Memory Management**: Automatic garbage collection
- **Components**:
  - Class Loader
  - Runtime Data Area
  - Execution Engine

### JRE (Java Runtime Environment)
- **Contains**: JVM + Core Libraries
- **Purpose**: Run Java applications
- **Size**: Smaller than JDK

### JDK (Java Development Kit)
- **Contains**: JRE + Development Tools
- **Tools Included**:
  - javac (compiler)
  - java (interpreter)
  - javadoc (documentation)
  - jar (archiver)
  - jdb (debugger)

## Installation Steps

### Windows:
1. Download JDK from Oracle/OpenJDK
2. Run installer (.exe file)
3. Set JAVA_HOME environment variable
4. Add %JAVA_HOME%\bin to PATH
5. Verify: \`java -version\`

### Linux/Mac:
\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-11-jdk

# CentOS/RHEL
sudo yum install java-11-openjdk-devel

# Mac (using Homebrew)
brew install openjdk@11
\`\`\`

## Java Program Structure
\`\`\`java
// 1. Package declaration (optional)
package com.example;

// 2. Import statements
import java.util.Scanner;

// 3. Class declaration
public class MyClass {
    // 4. Main method (entry point)
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\`

## Compilation Process
1. **Source Code** (.java) → **Compiler (javac)** → **Bytecode** (.class)
2. **Bytecode** → **JVM** → **Machine Code**

## Best Practices
- Use meaningful class names (PascalCase)
- Follow Java naming conventions
- Always include main method for executable classes
- Use proper indentation and comments`,
        codeExample: `// Complete Java Program Structure
package basics;

import java.util.Scanner;

public class HelloJava {
    public static void main(String[] args) {
        // Print welcome message
        System.out.println("Welcome to Java Programming!");
        
        // Get user input
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        // Display personalized message
        System.out.println("Hello, " + name + "!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        
        scanner.close();
    }
}`,
        practiceLinks: [
          { name: 'Oracle Java Tutorial', url: 'https://docs.oracle.com/javase/tutorial/' },
          { name: 'Java Installation Guide', url: 'https://www.oracle.com/java/technologies/downloads/' },
          { name: 'GeeksforGeeks Java Basics', url: 'https://www.geeksforgeeks.org/java-how-to-start-learning-java/' }
        ]
      },
      {
        id: 'variables-datatypes',
        title: 'Variables & Data Types',
        content: `# Variables & Data Types in Java

## Variables
A **variable** is a container that holds data that can be changed during program execution.

### Variable Declaration Syntax:
\`\`\`java
dataType variableName = value;
\`\`\`

### Variable Types:
1. **Local Variables**: Declared inside methods
2. **Instance Variables**: Declared inside class but outside methods
3. **Static Variables**: Declared with static keyword

## Primitive Data Types

### Integer Types:
| Type | Size | Range | Default |
|------|------|-------|----------|
| byte | 8-bit | -128 to 127 | 0 |
| short | 16-bit | -32,768 to 32,767 | 0 |
| int | 32-bit | -2³¹ to 2³¹-1 | 0 |
| long | 64-bit | -2⁶³ to 2⁶³-1 | 0L |

### Floating-Point Types:
| Type | Size | Precision | Default |
|------|------|-----------|----------|
| float | 32-bit | 7 decimal digits | 0.0f |
| double | 64-bit | 15 decimal digits | 0.0d |

### Other Types:
| Type | Size | Values | Default |
|------|------|--------|----------|
| boolean | 1-bit | true/false | false |
| char | 16-bit | Unicode characters | '\u0000' |

## Non-Primitive Data Types
- **String**: Sequence of characters
- **Arrays**: Collection of similar elements
- **Classes**: User-defined types
- **Interfaces**: Contract for classes

## Type Casting

### Implicit Casting (Widening):
\`\`\`java
int num = 100;
double decimal = num; // Automatic conversion
\`\`\`

### Explicit Casting (Narrowing):
\`\`\`java
double decimal = 100.99;
int num = (int) decimal; // Manual conversion (loses precision)
\`\`\`

## Variable Naming Rules
1. Must start with letter, underscore (_), or dollar sign ($)
2. Cannot start with digits
3. Case-sensitive
4. Cannot use Java keywords
5. Use camelCase convention

### Valid Names:
- age, firstName, _count, $price, studentId

### Invalid Names:
- 2name, class, public, first-name

## Constants
\`\`\`java
final int MAX_SIZE = 100;
final double PI = 3.14159;
\`\`\`

## Input/Output Operations

### Scanner Class for Input:
\`\`\`java
Scanner scanner = new Scanner(System.in);
int number = scanner.nextInt();
String text = scanner.nextLine();
\`\`\`

### System.out for Output:
\`\`\`java
System.out.println("Line with newline");
System.out.print("Same line");
System.out.printf("Formatted: %d%n", number);
\`\`\``,
        codeExample: `import java.util.Scanner;

public class DataTypesDemo {
    // Instance variables
    static final double PI = 3.14159; // Constant
    
    public static void main(String[] args) {
        // Integer types
        byte smallNum = 127;
        short mediumNum = 32000;
        int regularNum = 2147483647;
        long bigNum = 9223372036854775807L;
        
        // Floating-point types
        float price = 99.99f;
        double salary = 75000.50;
        
        // Other types
        boolean isActive = true;
        char grade = 'A';
        String name = "John Doe";
        
        // Display all variables
        System.out.println("=== Data Types Demo ===");
        System.out.println("Byte: " + smallNum);
        System.out.println("Short: " + mediumNum);
        System.out.println("Int: " + regularNum);
        System.out.println("Long: " + bigNum);
        System.out.println("Float: " + price);
        System.out.println("Double: " + salary);
        System.out.println("Boolean: " + isActive);
        System.out.println("Char: " + grade);
        System.out.println("String: " + name);
        System.out.println("Constant PI: " + PI);
        
        // Type casting examples
        double d = 100.99;
        int i = (int) d; // Explicit casting
        System.out.println("Double to Int: " + d + " -> " + i);
        
        // User input example
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        System.out.println("You are " + age + " years old.");
        
        scanner.close();
    }
}`,
        practiceLinks: [
          { name: 'HackerRank Java', url: 'https://www.hackerrank.com/domains/java' },
          { name: 'GeeksforGeeks Data Types', url: 'https://www.geeksforgeeks.org/data-types-in-java/' },
          { name: 'Oracle Variables Guide', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html' }
        ]
      },
      {
        id: 'operators-expressions',
        title: 'Operators & Expressions',
        content: `# Java Operators & Expressions

## Arithmetic Operators
| Operator | Description | Example |
|----------|-------------|----------|
| + | Addition | a + b |
| - | Subtraction | a - b |
| * | Multiplication | a * b |
| / | Division | a / b |
| % | Modulus (Remainder) | a % b |
| ++ | Increment | ++a, a++ |
| -- | Decrement | --a, a-- |

### Pre vs Post Increment:
\`\`\`java
int a = 5;
int b = ++a; // Pre-increment: a=6, b=6
int c = a++; // Post-increment: a=7, c=6
\`\`\`

## Relational Operators
| Operator | Description | Example |
|----------|-------------|----------|
| == | Equal to | a == b |
| != | Not equal to | a != b |
| > | Greater than | a > b |
| < | Less than | a < b |
| >= | Greater than or equal | a >= b |
| <= | Less than or equal | a <= b |

## Logical Operators
| Operator | Description | Example |
|----------|-------------|----------|
| && | Logical AND | a && b |
| \|\| | Logical OR | a \|\| b |
| ! | Logical NOT | !a |

### Short-Circuit Evaluation:
- **&&**: If first condition is false, second is not evaluated
- **||**: If first condition is true, second is not evaluated

## Assignment Operators
| Operator | Description | Example | Equivalent |
|----------|-------------|---------|------------|
| = | Simple assignment | a = b | a = b |
| += | Add and assign | a += b | a = a + b |
| -= | Subtract and assign | a -= b | a = a - b |
| *= | Multiply and assign | a *= b | a = a * b |
| /= | Divide and assign | a /= b | a = a / b |
| %= | Modulus and assign | a %= b | a = a % b |

## Bitwise Operators
| Operator | Description | Example |
|----------|-------------|----------|
| & | Bitwise AND | a & b |
| \| | Bitwise OR | a \| b |
| ^ | Bitwise XOR | a ^ b |
| ~ | Bitwise NOT | ~a |
| << | Left shift | a << 2 |
| >> | Right shift | a >> 2 |
| >>> | Unsigned right shift | a >>> 2 |

## Ternary Operator
\`\`\`java
condition ? value1 : value2
\`\`\`

## Operator Precedence (High to Low)
1. Postfix: expr++, expr--
2. Unary: ++expr, --expr, +expr, -expr, ~, !
3. Multiplicative: *, /, %
4. Additive: +, -
5. Shift: <<, >>, >>>
6. Relational: <, >, <=, >=, instanceof
7. Equality: ==, !=
8. Bitwise AND: &
9. Bitwise XOR: ^
10. Bitwise OR: |
11. Logical AND: &&
12. Logical OR: ||
13. Ternary: ? :
14. Assignment: =, +=, -=, etc.`,
        codeExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        // Arithmetic operators
        int a = 10, b = 3;
        System.out.println("=== Arithmetic Operators ===");
        System.out.println("a + b = " + (a + b)); // 13
        System.out.println("a - b = " + (a - b)); // 7
        System.out.println("a * b = " + (a * b)); // 30
        System.out.println("a / b = " + (a / b)); // 3
        System.out.println("a % b = " + (a % b)); // 1
        
        // Increment/Decrement
        System.out.println("\n=== Increment/Decrement ===");
        int x = 5;
        System.out.println("x = " + x);           // 5
        System.out.println("++x = " + (++x));     // 6
        System.out.println("x++ = " + (x++));     // 6
        System.out.println("x = " + x);           // 7
        
        // Relational operators
        System.out.println("\n=== Relational Operators ===");
        System.out.println("a > b: " + (a > b));   // true
        System.out.println("a == b: " + (a == b)); // false
        System.out.println("a != b: " + (a != b)); // true
        
        // Logical operators
        System.out.println("\n=== Logical Operators ===");
        boolean p = true, q = false;
        System.out.println("p && q: " + (p && q)); // false
        System.out.println("p || q: " + (p || q)); // true
        System.out.println("!p: " + (!p));         // false
        
        // Assignment operators
        System.out.println("\n=== Assignment Operators ===");
        int num = 10;
        System.out.println("num = " + num);        // 10
        num += 5;
        System.out.println("num += 5: " + num);    // 15
        num *= 2;
        System.out.println("num *= 2: " + num);    // 30
        
        // Ternary operator
        System.out.println("\n=== Ternary Operator ===");
        int age = 18;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Age " + age + " is " + status);
        
        // Bitwise operators
        System.out.println("\n=== Bitwise Operators ===");
        int m = 12; // 1100 in binary
        int n = 10; // 1010 in binary
        System.out.println("m & n = " + (m & n));   // 8 (1000)
        System.out.println("m | n = " + (m | n));   // 14 (1110)
        System.out.println("m ^ n = " + (m ^ n));   // 6 (0110)
        System.out.println("~m = " + (~m));         // -13
        System.out.println("m << 1 = " + (m << 1)); // 24
        System.out.println("m >> 1 = " + (m >> 1)); // 6
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks Operators', url: 'https://www.geeksforgeeks.org/operators-in-java/' },
          { name: 'Oracle Operators Tutorial', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html' },
          { name: 'HackerRank Practice', url: 'https://www.hackerrank.com/domains/java' }
        ]
      },
      {
        id: 'input-output',
        title: 'Input/Output Operations',
        content: `# Java Input/Output Operations

## Scanner Class (Input)
The **Scanner** class is used to get user input from various sources.

### Import Statement:
\`\`\`java
import java.util.Scanner;
\`\`\`

### Creating Scanner Object:
\`\`\`java
Scanner scanner = new Scanner(System.in);
\`\`\`

### Scanner Methods:
| Method | Description | Example |
|--------|-------------|----------|
| nextInt() | Read integer | int num = scanner.nextInt(); |
| nextDouble() | Read double | double price = scanner.nextDouble(); |
| nextFloat() | Read float | float rate = scanner.nextFloat(); |
| nextLong() | Read long | long id = scanner.nextLong(); |
| nextBoolean() | Read boolean | boolean flag = scanner.nextBoolean(); |
| next() | Read single word | String word = scanner.next(); |
| nextLine() | Read entire line | String line = scanner.nextLine(); |

### Important Notes:
- Always close Scanner: \`scanner.close();\`
- Use \`nextLine()\` after numeric input to consume newline
- \`next()\` reads until whitespace, \`nextLine()\` reads entire line

## System.out (Output)

### Print Methods:
| Method | Description | Example |
|--------|-------------|----------|
| print() | Print without newline | System.out.print("Hello"); |
| println() | Print with newline | System.out.println("Hello"); |
| printf() | Formatted output | System.out.printf("%d%n", 42); |

### Format Specifiers:
| Specifier | Type | Example |
|-----------|------|----------|
| %d | Integer | System.out.printf("%d", 42); |
| %f | Float/Double | System.out.printf("%.2f", 3.14159); |
| %s | String | System.out.printf("%s", "Hello"); |
| %c | Character | System.out.printf("%c", 'A'); |
| %b | Boolean | System.out.printf("%b", true); |
| %n | Newline | System.out.printf("Line1%nLine2"); |

### Formatting Examples:
\`\`\`java
double price = 123.456;
System.out.printf("Price: $%.2f%n", price); // Price: $123.46

int num = 42;
System.out.printf("Number: %05d%n", num); // Number: 00042

String name = "John";
System.out.printf("Hello, %10s!%n", name); // Hello,       John!
\`\`\`

## BufferedReader (Alternative Input)
\`\`\`java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String input = br.readLine();
int number = Integer.parseInt(input);
\`\`\`

## Command Line Arguments
\`\`\`java
public static void main(String[] args) {
    if (args.length > 0) {
        System.out.println("First argument: " + args[0]);
    }
}
\`\`\`

## File I/O Basics

### Reading from File:
\`\`\`java
import java.io.File;
import java.io.FileNotFoundException;

Scanner fileScanner = new Scanner(new File("input.txt"));
while (fileScanner.hasNextLine()) {
    String line = fileScanner.nextLine();
    System.out.println(line);
}
fileScanner.close();
\`\`\`

### Writing to File:
\`\`\`java
import java.io.FileWriter;
import java.io.IOException;

FileWriter writer = new FileWriter("output.txt");
writer.write("Hello, File!");
writer.close();
\`\`\`

## Best Practices
1. Always close Scanner/FileWriter
2. Handle exceptions properly
3. Use try-with-resources for automatic cleanup
4. Validate input before processing
5. Use appropriate input method for data type`,
        codeExample: `import java.util.Scanner;
import java.io.*;

public class InputOutputDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Basic input/output
        System.out.println("=== Basic Input/Output ===");
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.print("Enter your GPA: ");
        double gpa = scanner.nextDouble();
        
        // Formatted output
        System.out.println("\n=== Formatted Output ===");
        System.out.printf("Name: %s%n", name);
        System.out.printf("Age: %d years%n", age);
        System.out.printf("GPA: %.2f%n", gpa);
        
        // Multiple inputs
        scanner.nextLine(); // Consume newline
        System.out.println("\n=== Multiple Inputs ===");
        System.out.print("Enter 3 numbers separated by spaces: ");
        String[] numbers = scanner.nextLine().split(" ");
        
        int sum = 0;
        for (String num : numbers) {
            sum += Integer.parseInt(num);
        }
        System.out.println("Sum: " + sum);
        
        // Validation example
        System.out.println("\n=== Input Validation ===");
        int validNumber;
        do {
            System.out.print("Enter a positive number: ");
            while (!scanner.hasNextInt()) {
                System.out.print("Invalid input! Enter a number: ");
                scanner.next();
            }
            validNumber = scanner.nextInt();
        } while (validNumber <= 0);
        
        System.out.println("Valid number entered: " + validNumber);
        
        // File I/O example
        try {
            // Write to file
            FileWriter writer = new FileWriter("student_info.txt");
            writer.write("Student Information:\n");
            writer.write("Name: " + name + "\n");
            writer.write("Age: " + age + "\n");
            writer.write("GPA: " + gpa + "\n");
            writer.close();
            System.out.println("\nData saved to student_info.txt");
            
            // Read from file
            Scanner fileScanner = new Scanner(new File("student_info.txt"));
            System.out.println("\nReading from file:");
            while (fileScanner.hasNextLine()) {
                System.out.println(fileScanner.nextLine());
            }
            fileScanner.close();
            
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
        
        scanner.close();
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks Scanner', url: 'https://www.geeksforgeeks.org/scanner-class-in-java/' },
          { name: 'Oracle I/O Tutorial', url: 'https://docs.oracle.com/javase/tutorial/essential/io/' },
          { name: 'HackerRank Input/Output', url: 'https://www.hackerrank.com/domains/java' }
        ]
      }
    ]
  },
  controlFlow: {
    id: 'controlFlow',
    title: 'Control Flow & Loops',
    description: 'Master decision-making and repetitive structures: if-else, switch, for, while, do-while loops',
    topics: [
      {
        id: 'conditionals',
        title: 'If-Else & Switch Statements',
        content: `# Conditional Statements in Java

## If Statement
Executes code block only if condition is **true**.

### Syntax:
\`\`\`java
if (condition) {
    // code to execute if condition is true
}
\`\`\`

## If-Else Statement
Executes one block if condition is true, another if false.

### Syntax:
\`\`\`java
if (condition) {
    // code if true
} else {
    // code if false
}
\`\`\`

## If-Else-If Ladder
Tests multiple conditions in sequence.

### Syntax:
\`\`\`java
if (condition1) {
    // code for condition1
} else if (condition2) {
    // code for condition2
} else if (condition3) {
    // code for condition3
} else {
    // default code
}
\`\`\`

## Nested If Statements
\`\`\`java
if (outerCondition) {
    if (innerCondition) {
        // nested code
    }
}
\`\`\`

## Switch Statement
Multi-way branch statement for testing equality against multiple values.

### Syntax:
\`\`\`java
switch (expression) {
    case value1:
        // code for value1
        break;
    case value2:
        // code for value2
        break;
    default:
        // default code
}
\`\`\`

### Switch Rules:
1. Expression must be: byte, short, int, char, String, or enum
2. Case values must be constants
3. **break** prevents fall-through
4. **default** is optional but recommended

### Enhanced Switch (Java 12+):
\`\`\`java
switch (day) {
    case "Monday", "Tuesday" -> System.out.println("Weekday");
    case "Saturday", "Sunday" -> System.out.println("Weekend");
    default -> System.out.println("Invalid day");
}
\`\`\`

## Ternary Operator
Shorthand for simple if-else statements.

### Syntax:
\`\`\`java
variable = (condition) ? value1 : value2;
\`\`\`

## Best Practices
1. Use meaningful condition names
2. Avoid deep nesting (max 3 levels)
3. Always use braces {} even for single statements
4. Use switch for multiple equality checks
5. Include default case in switch statements
6. Use ternary operator for simple assignments only`,
        codeExample: `import java.util.Scanner;

public class ConditionalStatements {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Grade Calculator using if-else-if
        System.out.println("=== Grade Calculator ===");
        System.out.print("Enter your score (0-100): ");
        int score = scanner.nextInt();
        
        char grade;
        String description;
        
        if (score >= 90) {
            grade = 'A';
            description = "Excellent";
        } else if (score >= 80) {
            grade = 'B';
            description = "Good";
        } else if (score >= 70) {
            grade = 'C';
            description = "Average";
        } else if (score >= 60) {
            grade = 'D';
            description = "Below Average";
        } else {
            grade = 'F';
            description = "Fail";
        }
        
        System.out.printf("Grade: %c (%s)%n", grade, description);
        
        // Day of week using switch
        System.out.println("\n=== Day of Week ===");
        System.out.print("Enter day number (1-7): ");
        int dayNum = scanner.nextInt();
        
        String dayName;
        boolean isWeekend;
        
        switch (dayNum) {
            case 1:
                dayName = "Monday";
                isWeekend = false;
                break;
            case 2:
                dayName = "Tuesday";
                isWeekend = false;
                break;
            case 3:
                dayName = "Wednesday";
                isWeekend = false;
                break;
            case 4:
                dayName = "Thursday";
                isWeekend = false;
                break;
            case 5:
                dayName = "Friday";
                isWeekend = false;
                break;
            case 6:
                dayName = "Saturday";
                isWeekend = true;
                break;
            case 7:
                dayName = "Sunday";
                isWeekend = true;
                break;
            default:
                dayName = "Invalid";
                isWeekend = false;
        }
        
        System.out.println("Day: " + dayName);
        System.out.println("Weekend: " + (isWeekend ? "Yes" : "No"));
        
        // Nested if example - Age and license check
        System.out.println("\n=== Driving Eligibility ===");
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        System.out.print("Do you have a license? (true/false): ");
        boolean hasLicense = scanner.nextBoolean();
        
        if (age >= 18) {
            if (hasLicense) {
                System.out.println("You can drive!");
            } else {
                System.out.println("You need to get a license first.");
            }
        } else {
            System.out.println("You are too young to drive.");
        }
        
        // Ternary operator examples
        System.out.println("\n=== Ternary Operator Examples ===");
        int num1 = 15, num2 = 25;
        int max = (num1 > num2) ? num1 : num2;
        System.out.println("Maximum of " + num1 + " and " + num2 + " is: " + max);
        
        String ageCategory = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Age category: " + ageCategory);
        
        // Calculator using switch
        System.out.println("\n=== Simple Calculator ===");
        System.out.print("Enter first number: ");
        double a = scanner.nextDouble();
        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);
        System.out.print("Enter second number: ");
        double b = scanner.nextDouble();
        
        double result;
        boolean validOperation = true;
        
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b != 0) {
                    result = a / b;
                } else {
                    System.out.println("Error: Division by zero!");
                    validOperation = false;
                    result = 0;
                }
                break;
            default:
                System.out.println("Error: Invalid operator!");
                validOperation = false;
                result = 0;
        }
        
        if (validOperation) {
            System.out.printf("%.2f %c %.2f = %.2f%n", a, operator, b, result);
        }
        
        scanner.close();
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks If-Else', url: 'https://www.geeksforgeeks.org/java-if-else-statement-with-examples/' },
          { name: 'Oracle Control Flow', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html' },
          { name: 'HackerRank Conditionals', url: 'https://www.hackerrank.com/domains/java' }
        ]
      },
      {
        id: 'loops',
        title: 'Loops: For, While, Do-While',
        content: `# Loops in Java

Loops allow you to execute a block of code repeatedly based on a condition.

## For Loop
Used when you know the **exact number of iterations**.

### Syntax:
\`\`\`java
for (initialization; condition; increment/decrement) {
    // code to repeat
}
\`\`\`

### Example:
\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
\`\`\`

## Enhanced For Loop (For-Each)
Used to iterate through arrays and collections.

### Syntax:
\`\`\`java
for (dataType variable : array/collection) {
    // code using variable
}
\`\`\`

### Example:
\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

## While Loop
Executes as long as condition is **true**. Check condition **before** execution.

### Syntax:
\`\`\`java
while (condition) {
    // code to repeat
    // update condition variable
}
\`\`\`

### Example:
\`\`\`java
int i = 1;
while (i <= 5) {
    System.out.println("Count: " + i);
    i++;
}
\`\`\`

## Do-While Loop
Executes at least **once**, then checks condition. Check condition **after** execution.

### Syntax:
\`\`\`java
do {
    // code to repeat
    // update condition variable
} while (condition);
\`\`\`

### Example:
\`\`\`java
int i = 1;
do {
    System.out.println("Count: " + i);
    i++;
} while (i <= 5);
\`\`\`

## Loop Control Statements

### Break Statement
Exits the loop immediately.

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break; // Exit loop when i equals 5
    }
    System.out.println(i);
}
// Output: 1, 2, 3, 4
\`\`\`

### Continue Statement
Skips current iteration and moves to next.

\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skip when i equals 3
    }
    System.out.println(i);
}
// Output: 1, 2, 4, 5
\`\`\`

## Nested Loops
Loop inside another loop.

\`\`\`java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print(i + "," + j + " ");
    }
    System.out.println();
}
\`\`\`

## Infinite Loops
**Avoid these!** They run forever.

\`\`\`java
// Infinite for loop
for (;;) {
    // code
}

// Infinite while loop
while (true) {
    // code
}
\`\`\`

## When to Use Which Loop?

| Loop Type | Use When |
|-----------|----------|
| **for** | Known number of iterations |
| **enhanced for** | Iterating arrays/collections |
| **while** | Unknown iterations, condition-based |
| **do-while** | Execute at least once |

## Common Loop Patterns

### Counting:
\`\`\`java
for (int i = 0; i < n; i++) { /* code */ }
\`\`\`

### Reverse counting:
\`\`\`java
for (int i = n-1; i >= 0; i--) { /* code */ }
\`\`\`

### Step counting:
\`\`\`java
for (int i = 0; i < n; i += 2) { /* code */ }
\`\`\`

### Input validation:
\`\`\`java
while (!validInput) {
    // get input
    // validate
}
\`\`\``,
        codeExample: `import java.util.Scanner;

public class LoopsDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // For loop examples
        System.out.println("=== For Loop Examples ===");
        
        // Basic counting
        System.out.println("Counting 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // Multiplication table
        System.out.print("\nEnter a number for multiplication table: ");
        int num = scanner.nextInt();
        System.out.println("Multiplication table of " + num + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
        
        // Enhanced for loop with array
        System.out.println("\n=== Enhanced For Loop ===");
        int[] numbers = {10, 20, 30, 40, 50};
        System.out.println("Array elements:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        System.out.println();
        
        // While loop examples
        System.out.println("\n=== While Loop Examples ===");
        
        // Sum of digits
        System.out.print("Enter a number to find sum of digits: ");
        int number = scanner.nextInt();
        int originalNumber = number;
        int sum = 0;
        
        while (number > 0) {
            sum += number % 10;
            number /= 10;
        }
        System.out.println("Sum of digits of " + originalNumber + " is: " + sum);
        
        // Input validation using while
        System.out.println("\n=== Input Validation ===");
        int validNumber;
        while (true) {
            System.out.print("Enter a number between 1 and 100: ");
            validNumber = scanner.nextInt();
            if (validNumber >= 1 && validNumber <= 100) {
                break;
            }
            System.out.println("Invalid! Please try again.");
        }
        System.out.println("Valid number entered: " + validNumber);
        
        // Do-while loop example
        System.out.println("\n=== Do-While Loop Example ===");
        char choice;
        do {
            System.out.println("Menu:");
            System.out.println("1. Say Hello");
            System.out.println("2. Say Goodbye");
            System.out.println("3. Exit");
            System.out.print("Enter your choice (1-3): ");
            int menuChoice = scanner.nextInt();
            
            switch (menuChoice) {
                case 1:
                    System.out.println("Hello there!");
                    break;
                case 2:
                    System.out.println("Goodbye!");
                    break;
                case 3:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice!");
            }
            
            System.out.print("Continue? (y/n): ");
            choice = scanner.next().charAt(0);
            
        } while (choice == 'y' || choice == 'Y');
        
        // Nested loops - Pattern printing
        System.out.println("\n=== Nested Loops - Patterns ===");
        
        // Right triangle pattern
        System.out.println("Right triangle pattern:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        // Number pyramid
        System.out.println("\nNumber pyramid:");
        for (int i = 1; i <= 4; i++) {
            // Print spaces
            for (int j = 1; j <= 4 - i; j++) {
                System.out.print(" ");
            }
            // Print numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
        
        // Break and continue examples
        System.out.println("\n=== Break and Continue ===");
        
        System.out.println("Numbers 1-10, skip 5, stop at 8:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                continue; // Skip 5
            }
            if (i == 8) {
                break; // Stop at 8
            }
            System.out.print(i + " ");
        }
        System.out.println();
        
        // Prime number checker
        System.out.println("\n=== Prime Number Checker ===");
        System.out.print("Enter a number to check if prime: ");
        int primeCheck = scanner.nextInt();
        boolean isPrime = true;
        
        if (primeCheck <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= Math.sqrt(primeCheck); i++) {
                if (primeCheck % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        
        System.out.println(primeCheck + " is " + (isPrime ? "prime" : "not prime"));
        
        scanner.close();
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks Loops', url: 'https://www.geeksforgeeks.org/loops-in-java/' },
          { name: 'Oracle Loops Tutorial', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html' },
          { name: 'HackerRank Loop Practice', url: 'https://www.hackerrank.com/domains/java' }
        ]
      }
    ]
  },
  oop: {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Master OOP fundamentals: classes, objects, inheritance, polymorphism, encapsulation, and abstraction',
    topics: [
      {
        id: 'classes-objects',
        title: 'Classes & Objects',
        content: `# Classes & Objects in Java

## What is Object-Oriented Programming?
OOP is a programming paradigm based on **objects** that contain **data** (attributes) and **code** (methods).

### Four Pillars of OOP:
1. **Encapsulation** - Data hiding
2. **Inheritance** - Code reusability
3. **Polymorphism** - Multiple forms
4. **Abstraction** - Hiding complexity

## Class Definition
A **class** is a blueprint or template for creating objects.

### Class Syntax:
\`\`\`java
[access_modifier] class ClassName {
    // Fields (attributes)
    // Constructors
    // Methods
}
\`\`\`

### Class Components:
1. **Fields/Attributes** - Variables that store object state
2. **Methods** - Functions that define object behavior
3. **Constructors** - Special methods to initialize objects

## Object Creation
An **object** is an instance of a class.

### Object Creation Syntax:
\`\`\`java
ClassName objectName = new ClassName();
\`\`\`

### Memory Allocation:
- **Stack**: Stores object references
- **Heap**: Stores actual object data

## Fields/Attributes
Variables that represent the state of an object.

### Types of Variables:
1. **Instance Variables** - Unique to each object
2. **Static Variables** - Shared among all objects
3. **Local Variables** - Declared inside methods

\`\`\`java
public class Student {
    // Instance variables
    private String name;
    private int age;
    
    // Static variable
    private static int totalStudents = 0;
    
    // Method with local variable
    public void study() {
        int hours = 5; // Local variable
        System.out.println("Studying for " + hours + " hours");
    }
}
\`\`\`

## Methods
Functions that define what an object can do.

### Method Syntax:
\`\`\`java
[access_modifier] [static] returnType methodName(parameters) {
    // method body
    return value; // if not void
}
\`\`\`

### Method Types:
1. **Instance Methods** - Called on objects
2. **Static Methods** - Called on class
3. **Getter Methods** - Return field values
4. **Setter Methods** - Set field values

## Constructors
Special methods used to initialize objects.

### Constructor Rules:
1. Same name as class
2. No return type
3. Called automatically when object is created

### Types of Constructors:
1. **Default Constructor** - No parameters
2. **Parameterized Constructor** - With parameters
3. **Copy Constructor** - Creates copy of object

\`\`\`java
public class Student {
    private String name;
    private int age;
    
    // Default constructor
    public Student() {
        this.name = "Unknown";
        this.age = 0;
    }
    
    // Parameterized constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Copy constructor
    public Student(Student other) {
        this.name = other.name;
        this.age = other.age;
    }
}
\`\`\`

## Access Modifiers
Control visibility of class members.

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | ✓ | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✓ | ✗ |
| default | ✓ | ✓ | ✗ | ✗ |
| private | ✓ | ✗ | ✗ | ✗ |

## this Keyword
Refers to the current object instance.

### Uses of this:
1. Distinguish between instance and parameter variables
2. Call other constructors
3. Pass current object as parameter
4. Return current object

\`\`\`java
public class Student {
    private String name;
    
    public Student(String name) {
        this.name = name; // this.name refers to instance variable
    }
    
    public Student setName(String name) {
        this.name = name;
        return this; // Method chaining
    }
}
\`\`\`

## static Keyword
Belongs to class rather than instance.

### Static Members:
- **Static Variables** - Shared among all objects
- **Static Methods** - Called without creating objects
- **Static Blocks** - Execute when class is loaded

\`\`\`java
public class Counter {
    private static int count = 0; // Static variable
    
    public Counter() {
        count++; // Increment for each object
    }
    
    public static int getCount() { // Static method
        return count;
    }
    
    static { // Static block
        System.out.println("Counter class loaded");
    }
}
\`\`\`

## Best Practices
1. Use **private** fields with **public** getters/setters
2. Follow naming conventions (camelCase)
3. Initialize all fields in constructors
4. Use **this** keyword for clarity
5. Make utility methods **static**
6. Keep classes focused on single responsibility`,
        codeExample: `// Complete example demonstrating classes and objects
public class BankAccount {
    // Instance variables (private for encapsulation)
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private static int totalAccounts = 0; // Static variable
    
    // Static block
    static {
        System.out.println("Bank Account System Initialized");
    }
    
    // Default constructor
    public BankAccount() {
        this("Unknown", "000000", 0.0);
    }
    
    // Parameterized constructor
    public BankAccount(String accountHolder, String accountNumber, double initialBalance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        totalAccounts++; // Increment static counter
        System.out.println("Account created for: " + accountHolder);
    }
    
    // Copy constructor
    public BankAccount(BankAccount other) {
        this(other.accountHolder, other.accountNumber + "_COPY", other.balance);
    }
    
    // Getter methods
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
    
    public double getBalance() {
        return balance;
    }
    
    // Setter methods with validation
    public void setAccountHolder(String accountHolder) {
        if (accountHolder != null && !accountHolder.trim().isEmpty()) {
            this.accountHolder = accountHolder;
        } else {
            System.out.println("Invalid account holder name");
        }
    }
    
    // Instance methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("Deposited $%.2f. New balance: $%.2f%n", amount, balance);
        } else {
            System.out.println("Deposit amount must be positive");
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.printf("Withdrew $%.2f. New balance: $%.2f%n", amount, balance);
            return true;
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
            return false;
        }
    }
    
    public void transfer(BankAccount toAccount, double amount) {
        if (this.withdraw(amount)) {
            toAccount.deposit(amount);
            System.out.printf("Transferred $%.2f to %s%n", amount, toAccount.getAccountHolder());
        }
    }
    
    // Method chaining example
    public BankAccount setAccountDetails(String holder, String number) {
        this.accountHolder = holder;
        this.accountNumber = number;
        return this; // Return current object for chaining
    }
    
    // Static method
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    public static void displayBankInfo() {
        System.out.println("=== Bank Information ===");
        System.out.println("Total Accounts: " + totalAccounts);
        System.out.println("Bank Name: Java Bank");
    }
    
    // Override toString for better object representation
    @Override
    public String toString() {
        return String.format("Account[Number: %s, Holder: %s, Balance: $%.2f]", 
                           accountNumber, accountHolder, balance);
    }
    
    // Main method to demonstrate usage
    public static void main(String[] args) {
        // Display bank info (static method)
        BankAccount.displayBankInfo();
        
        // Create objects using different constructors
        BankAccount account1 = new BankAccount("Alice Johnson", "ACC001", 1000.0);
        BankAccount account2 = new BankAccount("Bob Smith", "ACC002", 500.0);
        BankAccount account3 = new BankAccount(); // Default constructor
        
        // Method chaining
        account3.setAccountDetails("Charlie Brown", "ACC003").deposit(750.0);
        
        // Demonstrate object operations
        System.out.println("\n=== Account Operations ===");
        System.out.println(account1); // Uses toString()
        System.out.println(account2);
        System.out.println(account3);
        
        // Perform transactions
        account1.deposit(200.0);
        account1.withdraw(150.0);
        account1.transfer(account2, 300.0);
        
        // Display updated balances
        System.out.println("\n=== Updated Balances ===");
        System.out.println(account1);
        System.out.println(account2);
        
        // Static method call
        System.out.println("\nTotal accounts created: " + BankAccount.getTotalAccounts());
        
        // Copy constructor example
        BankAccount account4 = new BankAccount(account1);
        System.out.println("Copied account: " + account4);
    }
}`,
        practiceLinks: [
          { name: 'Oracle OOP Tutorial', url: 'https://docs.oracle.com/javase/tutorial/java/concepts/' },
          { name: 'GeeksforGeeks Classes', url: 'https://www.geeksforgeeks.org/classes-objects-java/' },
          { name: 'HackerRank OOP', url: 'https://www.hackerrank.com/domains/java' }
        ]
      },
      {
        id: 'inheritance',
        title: 'Inheritance & Polymorphism',
        content: `# Inheritance & Polymorphism

## Inheritance
Mechanism where a new class **inherits** properties and methods from an existing class.

### Benefits:
- **Code Reusability** - Avoid duplicate code
- **Method Overriding** - Customize inherited behavior
- **Hierarchical Classification** - Organize related classes

### Inheritance Syntax:
\`\`\`java
class ChildClass extends ParentClass {
    // Additional fields and methods
}
\`\`\`

### Types of Inheritance:
1. **Single Inheritance** - One parent class
2. **Multilevel Inheritance** - Chain of inheritance
3. **Hierarchical Inheritance** - Multiple children from one parent

*Note: Java doesn't support multiple inheritance with classes*

## super Keyword
Refers to the immediate parent class.

### Uses of super:
1. Call parent class constructor
2. Access parent class methods
3. Access parent class variables

\`\`\`java
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void eat() {
        super.eat(); // Call parent method
        System.out.println("Dog is wagging tail while eating");
    }
}
\`\`\`

## Method Overriding
Redefining a parent class method in child class.

### Rules for Overriding:
1. Same method signature
2. Same or more accessible modifier
3. Same or subtype return type
4. Cannot override static, final, or private methods

### @Override Annotation:
\`\`\`java
@Override
public void methodName() {
    // Overridden implementation
}
\`\`\`

## Polymorphism
**"Many forms"** - Same interface, different implementations.

### Types of Polymorphism:
1. **Compile-time** - Method Overloading
2. **Runtime** - Method Overriding

### Runtime Polymorphism:
\`\`\`java
Animal animal1 = new Dog("Buddy", "Golden Retriever");
Animal animal2 = new Cat("Whiskers", "Persian");

animal1.makeSound(); // Calls Dog's makeSound()
animal2.makeSound(); // Calls Cat's makeSound()
\`\`\`

## Method Overloading vs Overriding

| Aspect | Overloading | Overriding |
|--------|-------------|------------|
| **When** | Compile-time | Runtime |
| **Where** | Same class | Different classes |
| **Parameters** | Different | Same |
| **Inheritance** | Not required | Required |
| **Access Modifier** | Any | Same or more accessible |

## Abstract Classes
Classes that cannot be instantiated, used as base classes.

\`\`\`java
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method (must be implemented by subclasses)
    public abstract double calculateArea();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
\`\`\`

## final Keyword
Prevents inheritance, overriding, or modification.

### Uses of final:
1. **final class** - Cannot be extended
2. **final method** - Cannot be overridden
3. **final variable** - Cannot be modified (constant)

\`\`\`java
final class FinalClass { } // Cannot be extended

class Parent {
    final void finalMethod() { } // Cannot be overridden
    final int CONSTANT = 100; // Cannot be modified
}
\`\`\`

## instanceof Operator
Checks if object is instance of specific class.

\`\`\`java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal; // Safe casting
    dog.bark();
}
\`\`\`

## Best Practices
1. Use inheritance for **"is-a"** relationships
2. Favor composition over inheritance when possible
3. Always use **@Override** annotation
4. Make parent class methods **protected** if needed by children
5. Use **abstract classes** for common base functionality
6. Keep inheritance hierarchies shallow (max 3-4 levels)`,
        codeExample: `// Comprehensive inheritance and polymorphism example

// Abstract base class
abstract class Vehicle {
    protected String brand;
    protected String model;
    protected int year;
    protected double price;
    
    // Constructor
    public Vehicle(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }
    
    // Abstract methods (must be implemented by subclasses)
    public abstract void start();
    public abstract void stop();
    public abstract double calculateInsurance();
    
    // Concrete methods
    public void displayInfo() {
        System.out.printf("%d %s %s - $%.2f%n", year, brand, model, price);
    }
    
    public final void honk() { // final method - cannot be overridden
        System.out.println("Beep! Beep!");
    }
    
    // Getters
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public double getPrice() { return price; }
}

// Car class extending Vehicle
class Car extends Vehicle {
    private int doors;
    private String fuelType;
    
    public Car(String brand, String model, int year, double price, int doors, String fuelType) {
        super(brand, model, year, price); // Call parent constructor
        this.doors = doors;
        this.fuelType = fuelType;
    }
    
    @Override
    public void start() {
        System.out.println("Car engine started with key");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
    
    @Override
    public double calculateInsurance() {
        return price * 0.05; // 5% of car price
    }
    
    // Car-specific method
    public void openTrunk() {
        System.out.println("Trunk opened");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.printf("Doors: %d, Fuel: %s%n", doors, fuelType);
    }
}

// Motorcycle class extending Vehicle
class Motorcycle extends Vehicle {
    private int engineCC;
    private boolean hasSidecar;
    
    public Motorcycle(String brand, String model, int year, double price, int engineCC, boolean hasSidecar) {
        super(brand, model, year, price);
        this.engineCC = engineCC;
        this.hasSidecar = hasSidecar;
    }
    
    @Override
    public void start() {
        System.out.println("Motorcycle started with kick/button");
    }
    
    @Override
    public void stop() {
        System.out.println("Motorcycle engine stopped");
    }
    
    @Override
    public double calculateInsurance() {
        return price * 0.08; // 8% of motorcycle price (higher risk)
    }
    
    // Motorcycle-specific method
    public void wheelie() {
        System.out.println("Performing wheelie!");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.printf("Engine: %dCC, Sidecar: %s%n", engineCC, hasSidecar ? "Yes" : "No");
    }
}

// Electric car class extending Car (multilevel inheritance)
class ElectricCar extends Car {
    private double batteryCapacity;
    private int range;
    
    public ElectricCar(String brand, String model, int year, double price, int doors, 
                      double batteryCapacity, int range) {
        super(brand, model, year, price, doors, "Electric");
        this.batteryCapacity = batteryCapacity;
        this.range = range;
    }
    
    @Override
    public void start() {
        System.out.println("Electric car started silently");
    }
    
    @Override
    public double calculateInsurance() {
        return super.calculateInsurance() * 0.9; // 10% discount for electric
    }
    
    // Electric car specific method
    public void charge() {
        System.out.println("Charging battery...");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.printf("Battery: %.1fkWh, Range: %d miles%n", batteryCapacity, range);
    }
}

// Demonstration class
public class VehicleDemo {
    // Method demonstrating polymorphism
    public static void testVehicle(Vehicle vehicle) {
        System.out.println("\n=== Testing Vehicle ===");
        vehicle.displayInfo();
        vehicle.start();
        vehicle.honk();
        vehicle.stop();
        System.out.printf("Insurance: $%.2f%n", vehicle.calculateInsurance());
        
        // Type checking and casting
        if (vehicle instanceof Car) {
            Car car = (Car) vehicle;
            car.openTrunk();
            
            if (vehicle instanceof ElectricCar) {
                ElectricCar eCar = (ElectricCar) vehicle;
                eCar.charge();
            }
        } else if (vehicle instanceof Motorcycle) {
            Motorcycle bike = (Motorcycle) vehicle;
            bike.wheelie();
        }
    }
    
    public static void main(String[] args) {
        // Create different types of vehicles
        Vehicle[] vehicles = {
            new Car("Toyota", "Camry", 2023, 25000, 4, "Gasoline"),
            new Motorcycle("Harley-Davidson", "Street 750", 2022, 8000, 750, false),
            new ElectricCar("Tesla", "Model 3", 2023, 40000, 4, 75.0, 300)
        };
        
        // Demonstrate polymorphism
        System.out.println("=== Polymorphism Demonstration ===");
        for (Vehicle vehicle : vehicles) {
            testVehicle(vehicle); // Same method, different behavior
        }
        
        // Method overloading example in separate class
        Calculator calc = new Calculator();
        System.out.println("\n=== Method Overloading ===");
        System.out.println("Add integers: " + calc.add(5, 3));
        System.out.println("Add doubles: " + calc.add(5.5, 3.2));
        System.out.println("Add three integers: " + calc.add(1, 2, 3));
        
        // Demonstrate inheritance hierarchy
        System.out.println("\n=== Inheritance Hierarchy ===");
        ElectricCar tesla = new ElectricCar("Tesla", "Model S", 2023, 80000, 4, 100.0, 400);
        
        System.out.println("tesla instanceof ElectricCar: " + (tesla instanceof ElectricCar));
        System.out.println("tesla instanceof Car: " + (tesla instanceof Car));
        System.out.println("tesla instanceof Vehicle: " + (tesla instanceof Vehicle));
        System.out.println("tesla instanceof Object: " + (tesla instanceof Object));
    }
}

// Method overloading example
class Calculator {
    // Overloaded methods - same name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks Inheritance', url: 'https://www.geeksforgeeks.org/inheritance-in-java/' },
          { name: 'Oracle Inheritance Tutorial', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html' },
          { name: 'Polymorphism Examples', url: 'https://www.geeksforgeeks.org/polymorphism-in-java/' }
        ]
      }
    ]
  },
  collections: {
    id: 'collections',
    title: 'Java Collections',
    description: 'Master Java Collections Framework: ArrayList, HashMap, HashSet, and advanced collection operations',
    topics: [
      {
        id: 'arraylist',
        title: 'ArrayList & List Interface',
        content: `# ArrayList & List Interface

## What is Java Collections Framework?
The **Java Collections Framework** provides a unified architecture for storing and manipulating groups of objects.

### Key Benefits:
- **Dynamic sizing** - Automatically grows/shrinks
- **Type safety** - Generic support
- **Rich API** - Many built-in methods
- **Performance** - Optimized implementations

## List Interface
Ordered collection that allows **duplicate elements** and **indexed access**.

### List Implementations:
| Implementation | Description | Best Use Case |
|----------------|-------------|---------------|
| **ArrayList** | Resizable array | Random access, frequent reads |
| **LinkedList** | Doubly-linked list | Frequent insertions/deletions |
| **Vector** | Synchronized ArrayList | Thread-safe operations |

## ArrayList Deep Dive

### Internal Structure:
- **Backed by array** - Default capacity: 10
- **Growth factor** - Increases by 50% when full
- **Index-based access** - O(1) random access
- **Dynamic resizing** - Automatic capacity management

### ArrayList Methods:

#### Adding Elements:
\`\`\`java
list.add(element);           // Add to end
list.add(index, element);    // Add at specific index
list.addAll(collection);     // Add all elements
\`\`\`

#### Accessing Elements:
\`\`\`java
list.get(index);            // Get element at index
list.indexOf(element);      // Find first occurrence
list.lastIndexOf(element);  // Find last occurrence
list.contains(element);     // Check if exists
\`\`\`

#### Removing Elements:
\`\`\`java
list.remove(index);         // Remove by index
list.remove(element);       // Remove by value
list.removeAll(collection); // Remove all matching
list.clear();              // Remove all elements
\`\`\`

#### Size and Capacity:
\`\`\`java
list.size();               // Current number of elements
list.isEmpty();            // Check if empty
list.ensureCapacity(n);    // Pre-allocate capacity
\`\`\`

## Iteration Methods

### 1. Enhanced For Loop (Recommended):
\`\`\`java
for (String item : list) {
    System.out.println(item);
}
\`\`\`

### 2. Traditional For Loop:
\`\`\`java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
\`\`\`

### 3. Iterator:
\`\`\`java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
\`\`\`

### 4. ListIterator (Bidirectional):
\`\`\`java
ListIterator<String> lit = list.listIterator();
while (lit.hasNext()) {
    System.out.println(lit.next());
}
\`\`\`

## ArrayList vs Array

| Feature | Array | ArrayList |
|---------|-------|----------|
| **Size** | Fixed | Dynamic |
| **Type Safety** | Compile-time | Runtime (with generics) |
| **Performance** | Faster | Slightly slower |
| **Memory** | Less overhead | More overhead |
| **Methods** | Limited | Rich API |

## Best Practices
1. **Use generics** for type safety
2. **Initialize with capacity** if size is known
3. **Use enhanced for loop** for iteration
4. **Avoid frequent insertions** in middle
5. **Consider LinkedList** for frequent modifications`,
        codeExample: `import java.util.*;

public class ArrayListMasterClass {
    public static void main(String[] args) {
        // Creating ArrayList with different methods
        System.out.println("=== ArrayList Creation ===");
        
        // Default constructor
        List<String> fruits = new ArrayList<>();
        
        // With initial capacity
        List<Integer> numbers = new ArrayList<>(20);
        
        // From another collection
        List<String> colors = new ArrayList<>(Arrays.asList("Red", "Green", "Blue"));
        
        // Adding elements
        System.out.println("\n=== Adding Elements ===");
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add(1, "Mango"); // Insert at index 1
        
        System.out.println("Fruits: " + fruits);
        
        // Adding numbers
        for (int i = 1; i <= 10; i++) {
            numbers.add(i * i); // Add squares
        }
        System.out.println("Squares: " + numbers);
        
        // Accessing elements
        System.out.println("\n=== Accessing Elements ===");
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Last fruit: " + fruits.get(fruits.size() - 1));
        System.out.println("Index of 'Banana': " + fruits.indexOf("Banana"));
        System.out.println("Contains 'Apple': " + fruits.contains("Apple"));
        
        // Iteration examples
        System.out.println("\n=== Iteration Methods ===");
        
        // Enhanced for loop
        System.out.println("Enhanced for loop:");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
        
        // Traditional for loop
        System.out.println("Traditional for loop:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.print(fruits.get(i) + " ");
        }
        System.out.println();
        
        // Iterator
        System.out.println("Using Iterator:");
        Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();
        
        // ListIterator (bidirectional)
        System.out.println("ListIterator (reverse):");
        ListIterator<String> listIterator = fruits.listIterator(fruits.size());
        while (listIterator.hasPrevious()) {
            System.out.print(listIterator.previous() + " ");
        }
        System.out.println();
        
        // Searching and filtering
        System.out.println("\n=== Searching & Filtering ===");
        
        // Find fruits starting with 'A'
        List<String> aFruits = new ArrayList<>();
        for (String fruit : fruits) {
            if (fruit.startsWith("A")) {
                aFruits.add(fruit);
            }
        }
        System.out.println("Fruits starting with 'A': " + aFruits);
        
        // Find even numbers
        List<Integer> evenNumbers = new ArrayList<>();
        for (Integer num : numbers) {
            if (num % 2 == 0) {
                evenNumbers.add(num);
            }
        }
        System.out.println("Even squares: " + evenNumbers);
        
        // Modifying ArrayList
        System.out.println("\n=== Modifying ArrayList ===");
        
        // Remove elements
        fruits.remove("Banana");           // Remove by value
        fruits.remove(0);                  // Remove by index
        System.out.println("After removal: " + fruits);
        
        // Replace element
        fruits.set(0, "Pineapple");
        System.out.println("After replacement: " + fruits);
        
        // Sorting
        Collections.sort(fruits);
        System.out.println("Sorted fruits: " + fruits);
        
        // Reverse
        Collections.reverse(fruits);
        System.out.println("Reversed fruits: " + fruits);
        
        // ArrayList operations
        System.out.println("\n=== ArrayList Operations ===");
        
        // Clone
        ArrayList<String> fruitsCopy = new ArrayList<>(fruits);
        System.out.println("Copied list: " + fruitsCopy);
        
        // Convert to array
        String[] fruitsArray = fruits.toArray(new String[0]);
        System.out.println("Array: " + Arrays.toString(fruitsArray));
        
        // Sublist
        List<Integer> subNumbers = numbers.subList(2, 5);
        System.out.println("Sublist (index 2-4): " + subNumbers);
        
        // Performance comparison
        System.out.println("\n=== Performance Test ===");
        performanceTest();
    }
    
    // Performance comparison method
    public static void performanceTest() {
        int size = 100000;
        
        // ArrayList performance
        long startTime = System.currentTimeMillis();
        List<Integer> arrayList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            arrayList.add(i);
        }
        long arrayListTime = System.currentTimeMillis() - startTime;
        
        // Array performance
        startTime = System.currentTimeMillis();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = i;
        }
        long arrayTime = System.currentTimeMillis() - startTime;
        
        System.out.println("ArrayList insertion time: " + arrayListTime + "ms");
        System.out.println("Array insertion time: " + arrayTime + "ms");
        
        // Random access test
        Random random = new Random();
        
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            int index = random.nextInt(size);
            arrayList.get(index);
        }
        long arrayListAccessTime = System.currentTimeMillis() - startTime;
        
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            int index = random.nextInt(size);
            int value = array[index];
        }
        long arrayAccessTime = System.currentTimeMillis() - startTime;
        
        System.out.println("ArrayList random access time: " + arrayListAccessTime + "ms");
        System.out.println("Array random access time: " + arrayAccessTime + "ms");
    }
}`,
        practiceLinks: [
          { name: 'Oracle Collections Tutorial', url: 'https://docs.oracle.com/javase/tutorial/collections/' },
          { name: 'GeeksforGeeks ArrayList', url: 'https://www.geeksforgeeks.org/arraylist-in-java/' },
          { name: 'HackerRank Collections', url: 'https://www.hackerrank.com/domains/java' }
        ]
      },
      {
        id: 'hashmap-set',
        title: 'HashMap & HashSet',
        content: `# HashMap & HashSet

## HashMap - Key-Value Storage

### What is HashMap?
HashMap stores data in **key-value pairs** using **hash table** for fast access.

### Key Features:
- **O(1) average** time complexity for get/put operations
- **No duplicate keys** allowed
- **Null values** and one null key allowed
- **Not synchronized** (not thread-safe)
- **No ordering** of elements

### HashMap Internal Working:
1. **Hash Function** - Converts key to hash code
2. **Bucket Array** - Array of linked lists/trees
3. **Collision Handling** - Chaining with linked lists
4. **Load Factor** - Default 0.75 (75% capacity)
5. **Rehashing** - Doubles capacity when load factor exceeded

### HashMap Methods:

#### Basic Operations:
\`\`\`java
map.put(key, value);        // Add/update key-value pair
map.get(key);              // Get value by key
map.remove(key);           // Remove key-value pair
map.containsKey(key);      // Check if key exists
map.containsValue(value);  // Check if value exists
\`\`\`

#### Bulk Operations:
\`\`\`java
map.putAll(otherMap);      // Add all from another map
map.clear();               // Remove all entries
map.size();                // Get number of entries
map.isEmpty();             // Check if empty
\`\`\`

#### View Operations:
\`\`\`java
map.keySet();              // Get all keys
map.values();              // Get all values
map.entrySet();            // Get all key-value pairs
\`\`\`

## HashSet - Unique Elements

### What is HashSet?
HashSet stores **unique elements** using **hash table** for fast lookups.

### Key Features:
- **No duplicate elements** allowed
- **O(1) average** time complexity for add/remove/contains
- **One null element** allowed
- **Not synchronized** (not thread-safe)
- **No ordering** of elements

### HashSet Methods:

#### Basic Operations:
\`\`\`java
set.add(element);          // Add element
set.remove(element);       // Remove element
set.contains(element);     // Check if exists
set.size();               // Get number of elements
set.isEmpty();            // Check if empty
\`\`\`

#### Bulk Operations:
\`\`\`java
set.addAll(collection);    // Add all elements
set.removeAll(collection); // Remove all matching
set.retainAll(collection); // Keep only matching
set.clear();              // Remove all elements
\`\`\`

## HashMap vs HashSet vs ArrayList

| Feature | HashMap | HashSet | ArrayList |
|---------|---------|---------|----------|
| **Storage** | Key-Value pairs | Unique elements | Indexed elements |
| **Duplicates** | No duplicate keys | No duplicates | Allows duplicates |
| **Ordering** | No order | No order | Insertion order |
| **Access Time** | O(1) average | O(1) average | O(1) by index |
| **Search Time** | O(1) average | O(1) average | O(n) linear |
| **Null Values** | One null key | One null element | Multiple nulls |

## When to Use What?

### Use HashMap when:
- Need **key-value** associations
- Require **fast lookups** by key
- Want to **map relationships** between objects
- Need **dictionary-like** functionality

### Use HashSet when:
- Need **unique elements** only
- Want **fast membership** testing
- Implementing **mathematical sets**
- Removing **duplicates** from collections

### Use ArrayList when:
- Need **indexed access** to elements
- Want to maintain **insertion order**
- Require **duplicate elements**
- Need **list operations** (sort, reverse, etc.)

## Advanced HashMap Concepts

### Load Factor and Performance:
\`\`\`java
// Default: capacity=16, loadFactor=0.75
Map<String, Integer> map1 = new HashMap<>();

// Custom capacity and load factor
Map<String, Integer> map2 = new HashMap<>(32, 0.6f);
\`\`\`

### Iteration Patterns:
\`\`\`java
// Iterate over keys
for (String key : map.keySet()) {
    System.out.println(key + " = " + map.get(key));
}

// Iterate over values
for (Integer value : map.values()) {
    System.out.println(value);
}

// Iterate over entries (most efficient)
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
\`\`\`

## Best Practices
1. **Override hashCode() and equals()** for custom keys
2. **Use immutable objects** as keys
3. **Initialize with appropriate capacity** if size is known
4. **Use entrySet()** for iteration over key-value pairs
5. **Consider ConcurrentHashMap** for thread safety
6. **Use LinkedHashMap** if insertion order matters`,
        codeExample: `import java.util.*;

public class HashMapHashSetDemo {
    public static void main(String[] args) {
        // HashMap demonstrations
        System.out.println("=== HashMap Examples ===");
        
        // Creating and populating HashMap
        Map<String, Integer> studentGrades = new HashMap<>();
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);
        studentGrades.put("Diana", 88);
        studentGrades.put("Eve", 94);
        
        System.out.println("Student Grades: " + studentGrades);
        
        // Accessing values
        System.out.println("\n=== Accessing HashMap Values ===");
        System.out.println("Alice's grade: " + studentGrades.get("Alice"));
        System.out.println("Contains 'Bob': " + studentGrades.containsKey("Bob"));
        System.out.println("Contains grade 90: " + studentGrades.containsValue(90));
        
        // Update existing value
        studentGrades.put("Alice", 97); // Update Alice's grade
        System.out.println("Updated Alice's grade: " + studentGrades.get("Alice"));
        
        // Iteration methods
        System.out.println("\n=== HashMap Iteration ===");
        
        // Method 1: Iterate over keys
        System.out.println("Method 1 - Keys:");
        for (String student : studentGrades.keySet()) {
            System.out.println(student + ": " + studentGrades.get(student));
        }
        
        // Method 2: Iterate over entries (recommended)
        System.out.println("\nMethod 2 - Entries:");
        for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Method 3: Iterate over values
        System.out.println("\nMethod 3 - Values only:");
        for (Integer grade : studentGrades.values()) {
            System.out.print(grade + " ");
        }
        System.out.println();
        
        // HashMap operations
        System.out.println("\n=== HashMap Operations ===");
        
        // Find students with grade > 90
        System.out.println("Students with grade > 90:");
        for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
            if (entry.getValue() > 90) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
        
        // Calculate average grade
        int total = 0;
        for (Integer grade : studentGrades.values()) {
            total += grade;
        }
        double average = (double) total / studentGrades.size();
        System.out.println("Average grade: " + String.format("%.2f", average));
        
        // HashSet demonstrations
        System.out.println("\n=== HashSet Examples ===");
        
        // Creating HashSet
        Set<String> uniqueColors = new HashSet<>();
        uniqueColors.add("Red");
        uniqueColors.add("Green");
        uniqueColors.add("Blue");
        uniqueColors.add("Red");    // Duplicate - won't be added
        uniqueColors.add("Yellow");
        
        System.out.println("Unique colors: " + uniqueColors);
        System.out.println("Size: " + uniqueColors.size());
        
        // HashSet operations
        System.out.println("\n=== HashSet Operations ===");
        
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));
        
        System.out.println("Set 1: " + set1);
        System.out.println("Set 2: " + set2);
        
        // Union
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union);
        
        // Intersection
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);
        
        // Difference
        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference (Set1 - Set2): " + difference);
        
        // Practical example: Remove duplicates from list
        System.out.println("\n=== Remove Duplicates Example ===");
        
        List<String> listWithDuplicates = Arrays.asList(
            "apple", "banana", "apple", "orange", "banana", "grape", "apple"
        );
        
        System.out.println("Original list: " + listWithDuplicates);
        
        // Method 1: Using HashSet
        Set<String> uniqueSet = new HashSet<>(listWithDuplicates);
        List<String> uniqueList = new ArrayList<>(uniqueSet);
        System.out.println("Unique elements (HashSet): " + uniqueList);
        
        // Method 2: Preserve order using LinkedHashSet
        Set<String> orderedUniqueSet = new LinkedHashSet<>(listWithDuplicates);
        List<String> orderedUniqueList = new ArrayList<>(orderedUniqueSet);
        System.out.println("Unique elements (ordered): " + orderedUniqueList);
        
        // Word frequency counter using HashMap
        System.out.println("\n=== Word Frequency Counter ===");
        
        String text = "java is great java is powerful java is versatile";
        String[] words = text.split(" ");
        
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        
        System.out.println("Word frequencies:");
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Performance comparison
        System.out.println("\n=== Performance Comparison ===");
        performanceComparison();
    }
    
    public static void performanceComparison() {
        int size = 100000;
        
        // HashMap vs ArrayList for lookups
        Map<Integer, String> map = new HashMap<>();
        List<String> list = new ArrayList<>();
        
        // Populate collections
        for (int i = 0; i < size; i++) {
            map.put(i, "Value" + i);
            list.add("Value" + i);
        }
        
        // HashMap lookup test
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            map.get(i);
        }
        long mapTime = System.currentTimeMillis() - startTime;
        
        // ArrayList search test
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            list.contains("Value" + i);
        }
        long listTime = System.currentTimeMillis() - startTime;
        
        System.out.println("HashMap lookup time: " + mapTime + "ms");
        System.out.println("ArrayList search time: " + listTime + "ms");
        System.out.println("HashMap is " + (listTime / mapTime) + "x faster for lookups");
    }
}`,
        practiceLinks: [
          { name: 'GeeksforGeeks HashMap', url: 'https://www.geeksforgeeks.org/java-util-hashmap-in-java-with-examples/' },
          { name: 'Oracle Map Tutorial', url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html' },
          { name: 'HashSet vs HashMap', url: 'https://www.geeksforgeeks.org/difference-between-hashmap-and-hashset/' }
        ]
      }
    ]
  },
  exceptions: {
    id: 'exceptions',
    title: 'Exception Handling & File I/O',
    description: 'Master exception handling, custom exceptions, and file I/O operations in Java',
    topics: [
      {
        id: 'try-catch',
        title: 'Exception Handling Fundamentals',
        content: `# Exception Handling in Java

## What are Exceptions?
Exceptions are **runtime errors** that disrupt the normal flow of program execution.

### Exception Hierarchy:
\`\`\`
Throwable
├── Error (System-level errors)
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── IllegalArgumentException
    │   └── NumberFormatException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException
\`\`\`

## Types of Exceptions

### 1. Checked Exceptions
- **Must be handled** at compile time
- **Declared in method signature** with throws
- Examples: IOException, SQLException, ClassNotFoundException

### 2. Unchecked Exceptions (Runtime)
- **Optional to handle** at compile time
- **Occur during runtime** due to programming errors
- Examples: NullPointerException, ArrayIndexOutOfBoundsException

### 3. Errors
- **System-level problems** beyond application control
- **Should not be caught** by applications
- Examples: OutOfMemoryError, StackOverflowError

## Exception Handling Keywords

### try Block
Contains code that **might throw an exception**.

\`\`\`java
try {
    // Risky code that might throw exception
    int result = 10 / 0;
}
\`\`\`

### catch Block
Handles **specific types of exceptions**.

\`\`\`java
catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
}
\`\`\`

### finally Block
Executes **regardless of exception occurrence**.

\`\`\`java
finally {
    // Cleanup code (close files, connections, etc.)
    System.out.println("This always executes");
}
\`\`\`

### throw Statement
**Manually throws an exception**.

\`\`\`java
if (age < 0) {
    throw new IllegalArgumentException("Age cannot be negative");
}
\`\`\`

### throws Clause
**Declares exceptions** that method might throw.

\`\`\`java
public void readFile(String filename) throws IOException {
    FileReader file = new FileReader(filename);
}
\`\`\`

## Exception Handling Patterns

### 1. Single Exception Handling:
\`\`\`java
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error: " + e.getMessage());
}
\`\`\`

### 2. Multiple Exception Handling:
\`\`\`java
try {
    String str = null;
    int length = str.length();
    int result = 10 / 0;
} catch (NullPointerException e) {
    System.out.println("Null pointer error");
} catch (ArithmeticException e) {
    System.out.println("Arithmetic error");
}
\`\`\`

### 3. Multi-Catch (Java 7+):
\`\`\`java
try {
    // risky code
} catch (IOException | SQLException e) {
    System.out.println("IO or SQL error: " + e.getMessage());
}
\`\`\`

### 4. Try-with-Resources (Java 7+):
\`\`\`java
try (FileReader file = new FileReader("data.txt");
     BufferedReader reader = new BufferedReader(file)) {
    return reader.readLine();
} catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
}
// Resources automatically closed
\`\`\`

## Common Built-in Exceptions

| Exception | Description | Example |
|-----------|-------------|----------|
| **NullPointerException** | Accessing null reference | str.length() when str is null |
| **ArrayIndexOutOfBoundsException** | Invalid array index | arr[10] for array of size 5 |
| **StringIndexOutOfBoundsException** | Invalid string index | str.charAt(20) for short string |
| **NumberFormatException** | Invalid number conversion | Integer.parseInt("abc") |
| **IllegalArgumentException** | Invalid method argument | Negative value for positive parameter |
| **ClassCastException** | Invalid type casting | (String) integerObject |
| **IOException** | Input/Output operation failed | File not found, network error |
| **SQLException** | Database operation failed | Invalid query, connection lost |

## Exception Methods

### Throwable Class Methods:
\`\`\`java
e.getMessage()        // Get error message
e.toString()          // Get exception name and message
e.printStackTrace()   // Print full stack trace
e.getCause()          // Get underlying cause
e.getStackTrace()     // Get stack trace as array
\`\`\`

## Best Practices

### 1. Catch Specific Exceptions:
\`\`\`java
// Good
try {
    // code
} catch (FileNotFoundException e) {
    // handle file not found
} catch (IOException e) {
    // handle other IO errors
}

// Avoid
try {
    // code
} catch (Exception e) {
    // too generic
}
\`\`\`

### 2. Don't Ignore Exceptions:
\`\`\`java
// Bad
try {
    // risky code
} catch (Exception e) {
    // Empty catch block - never do this!
}

// Good
try {
    // risky code
} catch (Exception e) {
    logger.error("Error occurred", e);
    // or handle appropriately
}
\`\`\`

### 3. Use Finally for Cleanup:
\`\`\`java
FileInputStream file = null;
try {
    file = new FileInputStream("data.txt");
    // process file
} catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
} finally {
    if (file != null) {
        try {
            file.close();
        } catch (IOException e) {
            System.out.println("Error closing file");
        }
    }
}
\`\`\`

### 4. Prefer Try-with-Resources:
\`\`\`java
// Automatic resource management
try (FileInputStream file = new FileInputStream("data.txt")) {
    // process file
} catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
}
// File automatically closed
\`\`\``,
        codeExample: `import java.io.*;
import java.util.*;

public class ExceptionHandlingMaster {
    public static void main(String[] args) {
        System.out.println("=== Exception Handling Examples ===");
        
        // Basic try-catch example
        basicExceptionHandling();
        
        // Multiple exception handling
        multipleExceptionHandling();
        
        // Finally block demonstration
        finallyBlockDemo();
        
        // Try-with-resources example
        tryWithResourcesDemo();
        
        // Custom exception example
        customExceptionDemo();
        
        // Exception propagation
        exceptionPropagationDemo();
    }
    
    // Basic exception handling
    public static void basicExceptionHandling() {
        System.out.println("\n=== Basic Exception Handling ===");
        
        try {
            int[] numbers = {1, 2, 3, 4, 5};
            System.out.println("Accessing index 2: " + numbers[2]);
            System.out.println("Accessing index 10: " + numbers[10]); // This will throw exception
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Exception type: " + e.getClass().getSimpleName());
        }
        
        // Null pointer exception example
        try {
            String str = null;
            int length = str.length(); // This will throw NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Null pointer error: Cannot call method on null reference");
        }
    }
    
    // Multiple exception handling
    public static void multipleExceptionHandling() {
        System.out.println("\n=== Multiple Exception Handling ===");
        
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter a number: ");
            String input = "abc"; // Simulating invalid input
            int number = Integer.parseInt(input);
            
            int[] array = {1, 2, 3};
            System.out.println("Result: " + array[number]);
            
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index out of bounds: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        }
        
        // Multi-catch example (Java 7+)
        try {
            // Simulate different types of errors
            throw new IOException("File not found");
        } catch (IOException | IllegalArgumentException e) {
            System.out.println("IO or Argument error: " + e.getMessage());
        }
    }
    
    // Finally block demonstration
    public static void finallyBlockDemo() {
        System.out.println("\n=== Finally Block Demo ===");
        
        FileInputStream file = null;
        try {
            System.out.println("Attempting to open file...");
            file = new FileInputStream("nonexistent.txt");
            System.out.println("File opened successfully");
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } finally {
            System.out.println("Finally block executed - cleaning up resources");
            if (file != null) {
                try {
                    file.close();
                    System.out.println("File closed");
                } catch (IOException e) {
                    System.out.println("Error closing file: " + e.getMessage());
                }
            }
        }
    }
    
    // Try-with-resources demonstration
    public static void tryWithResourcesDemo() {
        System.out.println("\n=== Try-with-Resources Demo ===");
        
        // Automatic resource management
        try (Scanner scanner = new Scanner("Hello World");
             StringWriter writer = new StringWriter()) {
            
            while (scanner.hasNext()) {
                String word = scanner.next();
                writer.write(word.toUpperCase() + " ");
            }
            
            System.out.println("Processed text: " + writer.toString());
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        // Resources automatically closed here
        System.out.println("Resources automatically closed");
    }
    
    // Custom exception demonstration
    public static void customExceptionDemo() {
        System.out.println("\n=== Custom Exception Demo ===");
        
        try {
            validateAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Custom exception caught: " + e.getMessage());
            System.out.println("Error code: " + e.getErrorCode());
        }
        
        try {
            validateAge(25);
            System.out.println("Age validation successful");
        } catch (InvalidAgeException e) {
            System.out.println("This won't be printed");
        }
    }
    
    // Method that throws custom exception
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative: " + age, "AGE_001");
        }
        if (age > 150) {
            throw new InvalidAgeException("Age cannot exceed 150: " + age, "AGE_002");
        }
    }
    
    // Exception propagation demonstration
    public static void exceptionPropagationDemo() {
        System.out.println("\n=== Exception Propagation Demo ===");
        
        try {
            method1();
        } catch (Exception e) {
            System.out.println("Exception caught in main: " + e.getMessage());
            System.out.println("\nStack trace:");
            e.printStackTrace();
        }
    }
    
    public static void method1() throws Exception {
        System.out.println("Method1 called");
        method2();
    }
    
    public static void method2() throws Exception {
        System.out.println("Method2 called");
        method3();
    }
    
    public static void method3() throws Exception {
        System.out.println("Method3 called - throwing exception");
        throw new Exception("Exception from method3");
    }
}

// Custom Exception Class
class InvalidAgeException extends Exception {
    private String errorCode;
    
    public InvalidAgeException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
}

// Example of custom resource for try-with-resources
class CustomResource implements AutoCloseable {
    private String name;
    
    public CustomResource(String name) {
        this.name = name;
        System.out.println("Resource " + name + " opened");
    }
    
    public void doSomething() {
        System.out.println("Doing something with " + name);
    }
    
    @Override
    public void close() {
        System.out.println("Resource " + name + " closed");
    }
}`,
        practiceLinks: [
          { name: 'Oracle Exception Tutorial', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/' },
          { name: 'GeeksforGeeks Exceptions', url: 'https://www.geeksforgeeks.org/exceptions-in-java/' },
          { name: 'Exception Handling Best Practices', url: 'https://www.baeldung.com/java-exceptions' }
        ]
      },
      {
        id: 'file-io',
        title: 'File I/O Operations',
        content: `# File I/O Operations in Java

## Java I/O Overview
Java provides comprehensive **Input/Output** capabilities through various classes and interfaces.

### I/O Stream Hierarchy:
\`\`\`
InputStream/OutputStream (Byte Streams)
├── FileInputStream/FileOutputStream
├── BufferedInputStream/BufferedOutputStream
└── DataInputStream/DataOutputStream

Reader/Writer (Character Streams)
├── FileReader/FileWriter
├── BufferedReader/BufferedWriter
└── PrintWriter
\`\`\`

## Types of I/O Streams

### 1. Byte Streams
- Handle **raw binary data**
- Base classes: **InputStream** and **OutputStream**
- Use for: Images, videos, executable files

### 2. Character Streams
- Handle **text data** with character encoding
- Base classes: **Reader** and **Writer**
- Use for: Text files, configuration files

## File Operations

### File Class
Represents **file and directory paths**.

\`\`\`java
File file = new File("data.txt");
File directory = new File("/path/to/directory");
\`\`\`

### File Methods:
| Method | Description |
|--------|-------------|
| exists() | Check if file/directory exists |
| isFile() | Check if it's a file |
| isDirectory() | Check if it's a directory |
| getName() | Get file name |
| getPath() | Get file path |
| length() | Get file size in bytes |
| lastModified() | Get last modification time |
| createNewFile() | Create new empty file |
| mkdir() | Create directory |
| delete() | Delete file/directory |
| listFiles() | List files in directory |

## Reading Files

### 1. FileReader (Character Stream):
\`\`\`java
try (FileReader reader = new FileReader("input.txt")) {
    int character;
    while ((character = reader.read()) != -1) {
        System.out.print((char) character);
    }
}
\`\`\`

### 2. BufferedReader (Efficient Reading):
\`\`\`java
try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
\`\`\`

### 3. Scanner (Convenient Reading):
\`\`\`java
try (Scanner scanner = new Scanner(new File("input.txt"))) {
    while (scanner.hasNextLine()) {
        System.out.println(scanner.nextLine());
    }
}
\`\`\`

### 4. Files Class (Java 7+):
\`\`\`java
// Read all lines at once
List<String> lines = Files.readAllLines(Paths.get("input.txt"));

// Read entire file as string
String content = Files.readString(Paths.get("input.txt"));
\`\`\`

## Writing Files

### 1. FileWriter (Character Stream):
\`\`\`java
try (FileWriter writer = new FileWriter("output.txt")) {
    writer.write("Hello, World!");
    writer.write("\nSecond line");
}
\`\`\`

### 2. BufferedWriter (Efficient Writing):
\`\`\`java
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Line 1");
    writer.newLine();
    writer.write("Line 2");
}
\`\`\`

### 3. PrintWriter (Convenient Writing):
\`\`\`java
try (PrintWriter writer = new PrintWriter("output.txt")) {
    writer.println("Line 1");
    writer.println("Line 2");
    writer.printf("Number: %d%n", 42);
}
\`\`\`

### 4. Files Class (Java 7+):
\`\`\`java
// Write string to file
Files.writeString(Paths.get("output.txt"), "Hello, World!");

// Write lines to file
List<String> lines = Arrays.asList("Line 1", "Line 2", "Line 3");
Files.write(Paths.get("output.txt"), lines);
\`\`\`

## Binary File Operations

### Reading Binary Files:
\`\`\`java
try (FileInputStream fis = new FileInputStream("image.jpg");
     BufferedInputStream bis = new BufferedInputStream(fis)) {
    
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = bis.read(buffer)) != -1) {
        // Process binary data
    }
}
\`\`\`

### Writing Binary Files:
\`\`\`java
try (FileOutputStream fos = new FileOutputStream("output.dat");
     BufferedOutputStream bos = new BufferedOutputStream(fos)) {
    
    byte[] data = {1, 2, 3, 4, 5};
    bos.write(data);
}
\`\`\`

## Advanced File Operations

### 1. File Copying:
\`\`\`java
// Using Files class (Java 7+)
Files.copy(Paths.get("source.txt"), Paths.get("destination.txt"));

// Manual copying
try (FileInputStream src = new FileInputStream("source.txt");
     FileOutputStream dest = new FileOutputStream("destination.txt")) {
    
    byte[] buffer = new byte[1024];
    int length;
    while ((length = src.read(buffer)) > 0) {
        dest.write(buffer, 0, length);
    }
}
\`\`\`

### 2. Directory Operations:
\`\`\`java
// Create directory
File dir = new File("myDirectory");
dir.mkdir();

// List files in directory
File[] files = dir.listFiles();
for (File file : files) {
    System.out.println(file.getName());
}

// Walk directory tree (Java 8+)
Files.walk(Paths.get("."))
     .filter(Files::isRegularFile)
     .forEach(System.out::println);
\`\`\`

### 3. File Attributes:
\`\`\`java
File file = new File("data.txt");
System.out.println("File name: " + file.getName());
System.out.println("File size: " + file.length() + " bytes");
System.out.println("Last modified: " + new Date(file.lastModified()));
System.out.println("Can read: " + file.canRead());
System.out.println("Can write: " + file.canWrite());
\`\`\`

## Serialization

### Object Serialization:
\`\`\`java
// Writing object to file
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("person.ser"))) {
    Person person = new Person("John", 30);
    oos.writeObject(person);
}

// Reading object from file
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("person.ser"))) {
    Person person = (Person) ois.readObject();
    System.out.println(person);
}
\`\`\`

## Best Practices

### 1. Always Use Try-with-Resources:
\`\`\`java
// Good
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    // read file
} catch (IOException e) {
    // handle exception
}

// Avoid
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    // read file
} finally {
    if (reader != null) reader.close();
}
\`\`\`

### 2. Use Buffered Streams for Performance:
\`\`\`java
// Efficient
try (BufferedReader reader = new BufferedReader(new FileReader("large.txt"))) {
    // fast reading
}

// Inefficient for large files
try (FileReader reader = new FileReader("large.txt")) {
    // slow reading
}
\`\`\`

### 3. Handle Exceptions Properly:
\`\`\`java
try {
    // file operations
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
} catch (IOException e) {
    System.err.println("I/O error: " + e.getMessage());
}
\`\`\`

### 4. Use Modern APIs (Java 7+):
\`\`\`java
// Modern approach
Path path = Paths.get("file.txt");
List<String> lines = Files.readAllLines(path);

// Traditional approach
List<String> lines = new ArrayList<>();
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        lines.add(line);
    }
}
\`\`\``,
        codeExample: `import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.time.LocalDateTime;

public class FileIOOperations {
    public static void main(String[] args) {
        System.out.println("=== File I/O Operations Demo ===");
        
        // File operations
        fileOperationsDemo();
        
        // Text file reading/writing
        textFileOperations();
        
        // Binary file operations
        binaryFileOperations();
        
        // Directory operations
        directoryOperations();
        
        // Modern file operations (Java 7+)
        modernFileOperations();
        
        // Serialization example
        serializationDemo();
    }
    
    public static void fileOperationsDemo() {
        System.out.println("\n=== File Operations Demo ===");
        
        try {
            // Create a new file
            File file = new File("demo.txt");
            
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists");
            }
            
            // File information
            System.out.println("File name: " + file.getName());
            System.out.println("Absolute path: " + file.getAbsolutePath());
            System.out.println("File size: " + file.length() + " bytes");
            System.out.println("Can read: " + file.canRead());
            System.out.println("Can write: " + file.canWrite());
            System.out.println("Is file: " + file.isFile());
            System.out.println("Is directory: " + file.isDirectory());
            
        } catch (IOException e) {
            System.out.println("Error creating file: " + e.getMessage());
        }
    }
    
    public static void textFileOperations() {
        System.out.println("\n=== Text File Operations ===");
        
        String filename = "student_data.txt";
        
        // Writing to file using PrintWriter
        try (PrintWriter writer = new PrintWriter(filename)) {
            writer.println("Student Database");
            writer.println("=================");
            writer.println("ID,Name,Grade,Score");
            writer.println("1,Alice Johnson,A,95");
            writer.println("2,Bob Smith,B,87");
            writer.println("3,Charlie Brown,A,92");
            writer.println("4,Diana Prince,B+,89");
            
            System.out.println("Data written to " + filename);
            
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
        
        // Reading from file using BufferedReader
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            System.out.println("\nReading from " + filename + ":");
            String line;
            int lineNumber = 1;
            
            while ((line = reader.readLine()) != null) {
                System.out.printf("%2d: %s%n", lineNumber++, line);
            }
            
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        
        // Append to file
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename, true))) {
            writer.println("5,Eve Wilson,A-,91");
            System.out.println("\nNew record appended to file");
            
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
    }
    
    public static void binaryFileOperations() {
        System.out.println("\n=== Binary File Operations ===");
        
        String binaryFile = "numbers.dat";
        
        // Write binary data
        try (DataOutputStream dos = new DataOutputStream(
                new BufferedOutputStream(new FileOutputStream(binaryFile)))) {
            
            // Write different data types
            dos.writeInt(42);
            dos.writeDouble(3.14159);
            dos.writeBoolean(true);
            dos.writeUTF("Hello Binary World");
            
            // Write array of integers
            int[] numbers = {10, 20, 30, 40, 50};
            dos.writeInt(numbers.length); // Write array length first
            for (int num : numbers) {
                dos.writeInt(num);
            }
            
            System.out.println("Binary data written to " + binaryFile);
            
        } catch (IOException e) {
            System.out.println("Error writing binary file: " + e.getMessage());
        }
        
        // Read binary data
        try (DataInputStream dis = new DataInputStream(
                new BufferedInputStream(new FileInputStream(binaryFile)))) {
            
            System.out.println("\nReading binary data:");
            
            // Read in same order as written
            int intValue = dis.readInt();
            double doubleValue = dis.readDouble();
            boolean boolValue = dis.readBoolean();
            String stringValue = dis.readUTF();
            
            System.out.println("Integer: " + intValue);
            System.out.println("Double: " + doubleValue);
            System.out.println("Boolean: " + boolValue);
            System.out.println("String: " + stringValue);
            
            // Read array
            int arrayLength = dis.readInt();
            int[] numbers = new int[arrayLength];
            for (int i = 0; i < arrayLength; i++) {
                numbers[i] = dis.readInt();
            }
            
            System.out.println("Array: " + Arrays.toString(numbers));
            
        } catch (IOException e) {
            System.out.println("Error reading binary file: " + e.getMessage());
        }
    }
    
    public static void directoryOperations() {
        System.out.println("\n=== Directory Operations ===");
        
        // Create directory
        File directory = new File("test_directory");
        if (directory.mkdir()) {
            System.out.println("Directory created: " + directory.getName());
        } else {
            System.out.println("Directory already exists or couldn't be created");
        }
        
        // Create files in directory
        try {
            File file1 = new File(directory, "file1.txt");
            File file2 = new File(directory, "file2.txt");
            File subDir = new File(directory, "subdirectory");
            
            file1.createNewFile();
            file2.createNewFile();
            subDir.mkdir();
            
            // Write some content
            try (PrintWriter writer = new PrintWriter(file1)) {
                writer.println("Content of file1");
            }
            
        } catch (IOException e) {
            System.out.println("Error creating files: " + e.getMessage());
        }
        
        // List directory contents
        System.out.println("\nDirectory contents:");
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                String type = file.isDirectory() ? "[DIR]" : "[FILE]";
                System.out.printf("%s %s (%d bytes)%n", 
                    type, file.getName(), file.length());
            }
        }
    }
    
    public static void modernFileOperations() {
        System.out.println("\n=== Modern File Operations (Java 7+) ===");
        
        try {
            Path path = Paths.get("modern_file.txt");
            
            // Write using Files class
            List<String> lines = Arrays.asList(
                "Modern Java File I/O",
                "Using java.nio.file package",
                "Much simpler and more powerful",
                "Supports atomic operations"
            );
            
            Files.write(path, lines, StandardOpenOption.CREATE);
            System.out.println("File written using Files.write()");
            
            // Read using Files class
            List<String> readLines = Files.readAllLines(path);
            System.out.println("\nFile contents:");
            readLines.forEach(line -> System.out.println("  " + line));
            
            // File attributes
            System.out.println("\nFile attributes:");
            System.out.println("Size: " + Files.size(path) + " bytes");
            System.out.println("Last modified: " + Files.getLastModifiedTime(path));
            System.out.println("Is readable: " + Files.isReadable(path));
            System.out.println("Is writable: " + Files.isWritable(path));
            
            // Copy file
            Path copyPath = Paths.get("modern_file_copy.txt");
            Files.copy(path, copyPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied to: " + copyPath);
            
        } catch (IOException e) {
            System.out.println("Error in modern file operations: " + e.getMessage());
        }
    }
    
    public static void serializationDemo() {
        System.out.println("\n=== Serialization Demo ===");
        
        // Create a student object
        Student student = new Student("John Doe", 20, "Computer Science", 3.8);
        
        // Serialize object to file
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("student.ser"))) {
            
            oos.writeObject(student);
            System.out.println("Student object serialized");
            
        } catch (IOException e) {
            System.out.println("Error serializing object: " + e.getMessage());
        }
        
        // Deserialize object from file
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("student.ser"))) {
            
            Student deserializedStudent = (Student) ois.readObject();
            System.out.println("Student object deserialized:");
            System.out.println(deserializedStudent);
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error deserializing object: " + e.getMessage());
        }
    }
}

// Serializable Student class
class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private int age;
    private String major;
    private double gpa;
    
    public Student(String name, int age, String major, double gpa) {
        this.name = name;
        this.age = age;
        this.major = major;
        this.gpa = gpa;
    }
    
    @Override
    public String toString() {
        return String.format("Student{name='%s', age=%d, major='%s', gpa=%.2f}",
                           name, age, major, gpa);
    }
    
    // Getters and setters would go here
}`,
        practiceLinks: [
          { name: 'Oracle File I/O Tutorial', url: 'https://docs.oracle.com/javase/tutorial/essential/io/' },
          { name: 'GeeksforGeeks File Handling', url: 'https://www.geeksforgeeks.org/file-handling-in-java/' },
          { name: 'Java NIO Tutorial', url: 'https://www.baeldung.com/java-nio-2-file-api' }
        ]
      }
    ]
  }
};