//Proposed Data Sctructure
// {
//     "Unique ID": {
//         "taskName": "Task Name",                    // String
//         "taskDescription": "Task Description",      // String
//         "categoryName": "Category",                 // String

//         "uniqueID": "Unqiue ID",                    // Integer
//         "relativeWeight": "Relative Weight",        // Integer
//         "numberOfTokens": "Number of Tokens",       // Integer
//         "minimumValue": "Minimum Value",          // Integer
//         "maximumValue": "Maximum Value",          // Integer
//         "incrementValue": "Increment Value",      // Integer

//         "isRequired": "Required",                   // Boolean
//         "isMutable": "Mutable",                     // Boolean
//         "istimed": "Timed",                         // Boolean
//         "isPrioritized": "Prioritize",              // Boolean
//         "isRepeatable": "Repeatable",               // Boolean
//         "isUnique": "Unique",                       // Boolean
//
//         "prerequisites": []                         // Array
//     }
// }

const taskData = {
    "1": {
        "taskName": "Collect Metal Ore",
        "taskDescription": "Collect Metal Ore using any method.  Metal ore may be harvested from rocks using a primitive pickaxe or a metal pickaxe.",
        "categoryName": "Collecting",

        "uniqueID": 1,
        "relativeWeight": 80,
        "numberOfTokens": 2,
        "minimumValue": 300,
        "maximumValue": 1200,
        "incrementValue": 100,

        "isRequired": false,
        "isMutable": false,
        "istimed": false,
        "isPrioritized": false,
        "isRepeatable": true,
        "isUnique": false,

        "prerequisites": []
    },
    "2": {
        "taskName": "Craft Tranquilizer Dart",
        "taskDescription": "Craft Tranquilizer Dart.<br>Required Materials: 2 Metal Ingot, 3 Narcotic.",
        "categoryName": "Crafting",

        "uniqueID": 2,
        "relativeWeight": 50,
        "numberOfTokens": 1,
        "minimumValue": 10,
        "maximumValue": 50,
        "incrementValue": 1,

        "isRequired": false,
        "isMutable": false,
        "istimed": false,
        "isPrioritized": false,
        "isRepeatable": true,
        "isUnique": true,

        "prerequisites": []
    },
    "3": {
        "taskName": "Collect Wood",
        "taskDescription": "Collect Wood using any method. Wood can be harvested from trees using an axe, metal axe or a \nchainsaw.",
        "categoryName": "Collecting",

        "uniqueID": 3,
        "relativeWeight": 100,
        "numberOfTokens": 1,
        "minimumValue": 1000,
        "maximumValue": 5000,
        "incrementValue": 100,

        "isRequired": false,
        "isMutable": true,
        "istimed": false,
        "isPrioritized": false,
        "isRepeatable": true,
        "isUnique": false,

        "prerequisites": []
    },
    "4": {
        "taskName": "Collect Organic Polymer",
        "taskDescription": "Collect Organic Polymer using any method.  Organic Polymer may be collect by killing:\n Mantis",
        "categoryName": "Collecting",

        "uniqueID": 4,
        "relativeWeight":20,
        "minimumValue": 20,
        "maximumValue": 80,
        "incrementValue": 2,
        "numberOfTokens": 1,

        "isRequired": false,
        "isMutable": true,
        "isTimed": false,
        "isPrioritized": false,
        "isRepeatable": true,
        "isUnique": true
    }
}