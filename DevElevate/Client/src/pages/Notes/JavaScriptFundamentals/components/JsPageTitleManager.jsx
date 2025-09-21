import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const jsRoutesAndTitles = {
    // Js Home Page
    "/notes/javascript": "Master JavaScript Fundamentals | Codify",


    "/notes/javascript/introduction": "JavaScript Introduction | Codify",
    "/notes/javascript/execution": "How JavaScript Executes | Codify",
    "/notes/javascript/node.js-installation": "Installing Node.js | Codify",

    // Javascript variables
    "/notes/javascript/what-are-variables": "What are Variables in JavaScript? | Codify",
    "/notes/javascript/variable-naming-rules": "JavaScript Variable Naming Rules | Codify",
    "/notes/javascript/primitives-and-objects": "Primitives vs Objects in JavaScript | Codify",
    "/notes/javascript/operators-and-expressions": "Operators and Expressions in JavaScript | Codify",
    "/notes/javascript/var-vs-let-vs-const": "var vs let vs const in JavaScript | Codify",

    // Javascript basics
    "/notes/javascript/if-else-conditionals": "If-Else Conditionals in JavaScript | Codify",
    "/notes/javascript/if-else-ladder": "If-Else Ladder in JavaScript | Codify",
    "/notes/javascript/switch-case": "Switch Case in JavaScript | Codify",
    "/notes/javascript/ternary-operator": "Ternary Operator in JavaScript | Codify",
    "/notes/javascript/for-loops": "For Loops in JavaScript | Codify",
    "/notes/javascript/while-loops": "While Loops in JavaScript | Codify",
    "/notes/javascript/functions": "Functions in JavaScript | Codify",

    // Javascript objects
    "/notes/javascript/strings": "JavaScript Strings | Codify",
    "/notes/javascript/arrays-and-array-methods": "JavaScript Arrays and Methods | Codify",
    "/notes/javascript/loops-with-arrays": "Looping Through Arrays in JavaScript | Codify",
    "/notes/javascript/map-filter-reduce": "Map, Filter, Reduce in JavaScript | Codify",
    "/notes/javascript/date": "JavaScript Date Object | Codify",
    "/notes/javascript/math": "JavaScript Math Object | Codify",
    "/notes/javascript/number": "JavaScript Numbers | Codify",
    "/notes/javascript/boolean": "JavaScript Booleans | Codify",

    // DOM and BOM
    "/notes/javascript/window-object": "JavaScript Window Object | Codify",
    "/notes/javascript/history-object": "JavaScript History Object | Codify",
    "/notes/javascript/navigator-object": "JavaScript Navigator Object | Codify",
    "/notes/javascript/screen-object": "JavaScript Screen Object | Codify",
    "/notes/javascript/document-object": "JavaScript Document Object | Codify",
    "/notes/javascript/getelementbyid": "JavaScript getElementById() | Codify",
    "/notes/javascript/getelementsbyclassname": "JavaScript getElementsByClassName() | Codify",
    "/notes/javascript/getelementsbyname": "JavaScript getElementsByName() | Codify",
    "/notes/javascript/getelementsbytagname": "JavaScript getElementsByTagName() | Codify",
    "/notes/javascript/innerhtml": "JavaScript innerHTML | Codify",
    "/notes/javascript/outerhtml": "JavaScript outerHTML | Codify",

    // OOPS
    "/notes/javascript/class": "JavaScript Classes | Codify",
    "/notes/javascript/objects": "Working with Objects in JavaScript | Codify",
    "/notes/javascript/static-method": "Static Methods in JavaScript | Codify",
    "/notes/javascript/constructor": "JavaScript Constructor | Codify",
    "/notes/javascript/encapsulation": "Encapsulation in JavaScript | Codify",
    "/notes/javascript/inheritance": "Inheritance in JavaScript | Codify",
    "/notes/javascript/polymorphism": "Polymorphism in JavaScript | Codify",
    "/notes/javascript/abstraction": "Abstraction in JavaScript | Codify",
};


const PageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        const pageTitle = jsRoutesAndTitles[location.pathname] || "Codify";
        document.title = pageTitle;
    }, [location]);

    return null;
};

export default PageTitleManager;
