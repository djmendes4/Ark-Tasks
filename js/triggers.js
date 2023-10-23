/* eslint-disable require-jsdoc */
/* Document created by Dillon Mendes on October 11th, 2023 */
/* Master Copy */

/* eslint-disable max-len */

'use strict';

const taskButtonEventHandler = function (taskSlot, event) {
    const parentElement = event.target.parentElement;
    let newElement = document.createElement('div');

    const isAssign = parentElement.querySelector('.assign') !== null ? true : false;
    const isUnchecked = parentElement.querySelector('.unchecked') !== null ? true : false;
    const isChecked = parentElement.querySelector('.checked') !== null ? true : false;

    const addNewElement = function (className) {
        newElement.setAttribute('class', className);
        newElement.classList.add('fadeIn')
        parentElement.insertBefore(newElement, parentElement.firstChild);

        setTimeout(function () {
            parentElement.querySelector('.' + className).classList.remove('fadeIn');
        }, 400);
    };

    const removeOldElement = function (className) {
        parentElement.querySelector('.' + className).classList.add('fadeOut');

        setTimeout(function() {
            parentElement.querySelector('.' + className).remove();
        }, 400);
    };

    if (isAssign) {
        assignNewTask(taskSlot);

        addNewElement('unchecked');
        removeOldElement('assign');        
    }

    if (isUnchecked) {
        addNewElement('checked');
        removeOldElement('unchecked');

        setTimeout(function () {
            newElement = document.createElement('div');
            addNewElement('assign');
            removeOldElement('checked');

        }, 1600);
    }

    if (isChecked) {
        newElement.setAttribute('class', 'assign fadeIn');
        
        parentElement.insertBefore(newElement, parentElement.firstChild);
        parentElement.querySelector('.checked').classList.add('fadeOut');

        setTimeout(function() {
            parentElement.querySelector('.checked').remove();
            parentElement.querySelector('.assign').classList.remove('fadeIn');
        }, 400);
    }
};

const test = function () {
    console.log('Success');
};

let taskSlot1 = 'taskSlot1';
let taskSlot2 = 'taskSlot2';
let taskSlot3 = 'taskSlot3';

document.getElementById(taskSlot1).querySelector('.task.button').addEventListener('click', taskButtonEventHandler.bind(this, document.getElementById(taskSlot1)));
document.getElementById(taskSlot2).querySelector('.task.button').addEventListener('click', taskButtonEventHandler.bind(this, document.getElementById(taskSlot2)));
document.getElementById(taskSlot3).querySelector('.task.button').addEventListener('click', taskButtonEventHandler.bind(this, document.getElementById(taskSlot3)));

document.getElementById(taskSlot1).querySelector('.reroll.button').querySelector('.hover').addEventListener('click', test.bind(this, document.getElementById(taskSlot1)));
document.getElementById(taskSlot2).querySelector('.reroll.button').querySelector('.hover').addEventListener('click', test.bind(this, document.getElementById(taskSlot2)));
document.getElementById(taskSlot3).querySelector('.reroll.button').querySelector('.hover').addEventListener('click', test.bind(this, document.getElementById(taskSlot3)));