$(document).ready(onStart);

function onStart(){
    console.log('JQ');
    getTask();
    // $('#submitTask').on('click', addTask);
}

// function addTask(){
//     let newTask = {
//         author: $('#authorInput').val(),
//         description: $('#taskInput').val()
//     };

//     $.ajax({
//         method: 'POST',
//         url: '/tasks',
//         data: newTask,
//         success: function(response){
//             console.log('POST success', response);
            
//         }
//     });
// }

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
    $('#taskSpace').append(`
        <li class="task">
        <p>Who's Task: ${task.author}, Task: ${task.description}, Completed? ${task.completion}</p>
        </li>
        <select id="completionDropdown">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        <button id="submitComplete">Completion</button>
        <button id="deleteButon">Delete</button>
    `);
}