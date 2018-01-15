$(document).ready(onStart);

function onStart(){
    console.log('JQ');
    getTask();
    $('#submitTask').on('click', addTask);
}

function addTask(){
    let newTask= {
        author: $('#authorInput').val(),
        description: $('#taskInput').val()
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask,
        success: function(response){
            console.log('POST success', response);
            getTask();
            $('#authorInput').val('');
            $('#taskInput').val('');
        }
    });
}

function getTask(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response){
            console.log('GET success', response);
            appendTask(response);
        }
    });
}

function appendTask(task){
    $('#taskSpace').empty();
    for (let i = 0; i < task.length; i++) {  
        $('#taskSpace').append(`
            <li class="task">
            <p>Who's Task: ${task[i].author}</p> 
            <p>Task: ${task[i].description}</p>
            <p>Completed? ${task[i].completion}</p>
            </li>
            <select class="completionDropdown">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button class="submitComplete">Submit Completion</button>
            <button class="deleteButon">Delete</button>
        `);
    }
}