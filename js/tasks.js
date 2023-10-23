/* eslint-disable require-jsdoc */
/* Document created by Dillon Mendes on October 11th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

'use strict';

const generatePlaceholderData = function () {
    let taskNumber = Math.floor(Math.random() * Object.keys(taskData).length) + 1;

    document.getElementsByName('TASK_NAME')[0].setAttribute('placeholder', taskData[taskNumber].taskName);
    document.getElementsByName('TASK_DESCRIPTION')[0].setAttribute('placeholder', taskData[taskNumber].taskDescription);
    document.getElementsByName('CATEGORY_NAME')[0].setAttribute('placeholder', taskData[taskNumber].categoryName);

    document.getElementsByName('RELATIVE_WEIGHT')[0].setAttribute('placeholder', taskData[taskNumber].relativeWeight);
    document.getElementsByName('MINIMUM_VALUE')[0].setAttribute('placeholder', taskData[taskNumber].minimumValue);
    document.getElementsByName('MAXIMUM_VALUE')[0].setAttribute('placeholder', taskData[taskNumber].maximumValue);
    document.getElementsByName('INCREMENT_VALUE')[0].setAttribute('placeholder', taskData[taskNumber].incrementValue);
    document.getElementsByName('NUMBER_OF_TOKENS')[0].setAttribute('placeholder', taskData[taskNumber].numberOfTokens);

    document.getElementsByName('IS_REQUIRED')[0].checked = taskData[taskNumber].isRequired;
    document.getElementsByName('IS_MUTABLE')[0].checked = taskData[taskNumber].isMutable;
    document.getElementsByName('IS_TIMED')[0].checked = taskData[taskNumber].isTimed;
    document.getElementsByName('IS_PRIORITIZED')[0].checked = taskData[taskNumber].isPrioritized;
    document.getElementsByName('IS_REPEATABLE')[0].checked = taskData[taskNumber].isRepeatable;
    document.getElementsByName('IS_UNIQUE')[0].checked = taskData[taskNumber].isUnique;
};

const copyData = function () {
    let _taskName = document.getElementsByName('TASK_NAME')[0].value;
    let _taskDescription = document.getElementsByName('TASK_DESCRIPTION')[0].value;
    let _categoryName = document.getElementsByName('CATEGORY_NAME')[0].value;

    let _uniqueID = Object.keys(taskData).length + 1;
    let _relativeWeight = document.getElementsByName('RELATIVE_WEIGHT')[0].value;
    let _minimumValue = document.getElementsByName('MINIMUM_VALUE')[0].value;
    let _maximumValue = document.getElementsByName('MAXIMUM_VALUE')[0].value;
    let _incrementValue = document.getElementsByName('INCREMENT_VALUE')[0].value;
    let _numberOfTokens = document.getElementsByName('NUMBER_OF_TOKENS')[0].value;

    let _isRequired = document.getElementsByName('IS_REQUIRED')[0].checked;
    let _isMutable = document.getElementsByName('IS_MUTABLE')[0].checked;
    let _isTimed = document.getElementsByName('IS_TIMED')[0].checked;
    let _isPrioritized = document.getElementsByName('IS_PRIORITIZED')[0].checked;
    let _isRepeatable = document.getElementsByName('IS_REPEATABLE')[0].checked;
    let _isUnique = document.getElementsByName('IS_UNIQUE')[0].checked;

    let newTask = {
        taskName: _taskName,
        taskDescription: _taskDescription,
        categoryName: _categoryName,

        uniqueID: _uniqueID,
        relativeWeight: _relativeWeight,
        minimumValue: _minimumValue,
        maximumValue: _maximumValue,
        incrementValue: _incrementValue,
        numberOfTokens: _numberOfTokens,

        isRequired: _isRequired,
        isMutable: _isMutable,
        isTimed: _isTimed,
        isPrioritized: _isPrioritized,
        isRepeatable: _isRepeatable,
        isUnique: _isUnique
    }

    taskData[_uniqueID] = newTask;

    navigator.clipboard.writeText(JSON.stringify(taskData));
};

const assignNewTask = function (element, event) {
    const task = chooseNewTask(); //console.log(task);
    const taskSlot = element !== undefined ? element : false;
    const taskButton = taskSlot.querySelector('.task.button');

    let elements = {
        
        'taskName': taskSlot.querySelector('.taskName'),
        'taskDescription': taskSlot.querySelector('.taskDescription'),
        'amount': taskSlot.querySelector('.amount'),
        'numberOfTokens': taskSlot.querySelector('.numberOfTokens'),
        'reroll': taskSlot.querySelector('.reroll.button')
    }

    let amount = Math.floor(Math.random() * (((task.maximumValue - task.minimumValue) / task.incrementValue) + 1)) * task.incrementValue + task.minimumValue;

    elements.taskName.innerHTML = '<div>' + task.taskName + '</div>' + ' <div>(' + task.probability + '%)</div>';
    elements.taskDescription.innerHTML = task.taskDescription;
    elements.amount.innerHTML = '<div>Amount</div><div>' + amount + '</div>';
    elements.numberOfTokens.innerHTML = '<div>Tokens</div>' + task.numberOfTokens;

    activeTasks.push(task);

    if (task.isMutable) {
        elements.reroll.hidden = false;
    }
}

const chooseNewTask = function () {
    const category = chooseNewTaskCategory();
    const tasks = filterObjectMatchingCondition(taskData, 'categoryName', category[0]);
    let newTask = {};
    
    let total = 0;
    for (let i = 0; i < tasks.length; i += 1) {
        total += tasks[i].relativeWeight;
    }

    const randomNumber = Math.random() * total;
    
    let sum = 0;
    for (let i = 0; i < tasks.length; i += 1) {
        sum += tasks[i].relativeWeight;

        if (randomNumber < sum) {
            tasks[i].probability = Math.round(tasks[i].relativeWeight / total * category[2] * 10000) / 100;
            newTask = tasks[i];
            break;
        }
    }

    if (newTask.isUnique) {
        for (let i = 0; i < activeTasks.length; i += 1) {
            if (activeTasks[i].uniqueID === newTask.uniqueID) {
                console.log('New Task was is already in use');
                return chooseNewTask();
            }
        }
    }

    return newTask;
};

const filterObjectMatchingCondition = function (objectToFilter, match, valueToMatch) {
    let array = [];

    for (let i = 1; i <= Object.keys(objectToFilter).length; i += 1) {
        if (objectToFilter[i][match] === valueToMatch) {
            array.push(objectToFilter[i]);
        }
    }

    return array;
};

const chooseNewTaskCategory = function () {
    let total = 0;

    for (let i = 0; i <categories.length; i += 1) {
        total += categories[i][1];
    }

    const randomNumber = Math.random() * total;
    let sum = 0;

    for (let i = 0; i < categories.length; i += 1) {
        sum += categories[i][1];

        // console.log('Random Number =' + randomNumber + ' || i =' + i + ' || sum = ' + sum);

        if (randomNumber < sum) {
            let category = categories[i];
            let tasks = filterObjectMatchingCondition(taskData, 'categoryName', categories[i][0]);

            if (tasks.length === 0) {
                categories[i][1] = 0;
                return chooseNewTaskCategory();
            } else {
                category.push(categories[i][1] / total);
                return category;
            }
        }
    }
};

const validateCategories = function () {
    for(let i = 0; i < categories.length; i += 1) {
        let tasks = filterObjectMatchingCondition(taskData, 'categoryName', categories[i][0]);

        if (tasks.length === 0) {
            categories[i][1] = 0;
        }
    }
};

const findArraySum = function () {

};

const categories = [
    ["Collecting", 16],
    ["Crafting", 14],
    ["Taming", 14],
    ["Breeding", 8],
    ["Building", 20],
    ["Hunting", 10],
    ["Exploring", 8],
    ["Progression", 5],
    ["Programming", 5]
];

const activeTasks = [];