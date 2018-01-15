$(document).ready(onStart);

function onStart(){
    console.log('JQ');
    getTask();
    $('#submitTask').on('click', addTask);
    $('#taskSpace').on('click', '.deleteButton', deleteTask);
    $('#taskSpace').on('click', '.submitComplete', updateTask);
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
        let $row = $('<li class="task">');
        $row.data('id', task[i].id);
        $row.append(`
            <p>Who's Task: ${task[i].author}</p>
            <p>Task: ${task[i].description}</p>
            <p>Completed? ${task[i].completion}</p>  
            <select class="completionDropdown">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button class="submitComplete">Submit Completion</button>
            <button class="deleteButton">Delete</button>`
        );
        $('#taskSpace').append($row);
    }
}

function deleteTask(){
    let task = $(this).closest('li').data('id');
    console.log(task);
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + task,
        success: function(response){
            console.log('delete request:', response);
            getTask();
        }
    });
}

function updateTask(){
    let task = $(this).closest('li').data('id');
    let completion = $(this).parent().children('select').val();
    console.log(completion);
    
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + task,
        data: {completion: completion},
        success: function(response){
            console.log('update request:', response);
            getTask();
        }
    })
}