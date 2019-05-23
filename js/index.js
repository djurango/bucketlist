'use strict'

$(document).ready(function(){
    $(".btn.switch").click(function(){
        $("body, header, nav, section, .grid-item, .crud, form").toggleClass( "active" );
    });
});


$( function() {
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            duration: 300
        },
        hide: {
            duration: 300
        }
    });

    $( "#opener" ).on( "click", function() {
        $( "#dialog" ).dialog( "open" );
    });
} );

$( function() {
    $( "#taskDueDateInput" ).datepicker();
    $( "#anim" ).on( "change", function() {
        $( "#taskDueDateInput" ).datepicker( "option", "showAnim", $( this ).val() );
    });
} );



//

document.getElementById('taskInputForm').addEventListener('submit', savetask);

function savetask(e) {
    let taskTitle = document.getElementById('taskTitleInput').value;
    let taskImportance = document.getElementById('taskImportanceInput').value;
    let taskId = chance.guid();
    let taskStatus = '<div class="status-open">Open</div>';
    let taskDate = moment().format('L');
    let taskDueDate = document.getElementById('taskDueDateInput').value;;


    let task = {
        id: taskId,
        title: taskTitle,
        importance: taskImportance,
        status: taskStatus,
        date: taskDate,
        duedate: taskDueDate
    };

    if (localStorage.getItem('tasks') == null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    document.getElementById('taskInputForm').reset();

    fetchtasks();

    e.preventDefault();
}

function setStatusClosed(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = '<div class="status-closed">Done</div> ';
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchtasks();
}

function deletetask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchtasks();
}

function fetchtasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksList = document.getElementById('tasksList');

    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let title = tasks[i].title;
        let importance = tasks[i].importance;
        let status = tasks[i].status;
        let date = tasks[i].date;
        let duedate = tasks[i].duedate;

        tasksList.innerHTML +=   '<div class="grid-item">'+
            '<div>' + status + '</div>'+
            '<div class="task-title"><h4>' + title + '</h4></div>'+
            '<p>Importance: ' + importance + '</p>'+
            '<p>Date: ' + date + '</p>'+
            '<p>Due Date: ' + duedate + '</p>'+


            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="material-icons crud">check</a> '+
            '<a href="#" onclick="editTask(\''+id+'\')" class="material-icons crud">edit</a> '+
            '<a href="#" onclick="deletetask(\''+id+'\')" class="material-icons crud">delete_forever</a>'+
            '</div>';
    }
}
