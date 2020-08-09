$(document).ready(function(){
    console.log('jq');
    //set up click Listeners
    setupClickListeners();
    //load existing tasks on page load
    // $('#taskBtn').on('click', addItem);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
});

// function addItem(e){
//     e.preventDefault();
//     console.log('in addItem');
// }

function setupClickListeners() {
    $('#taskBtn').on('click', function(){
        console.log('in taskBtn on click');
        let taskToSend = {
        actionItem: $('#actionItemIn').val(),
        levelOfImportance: $('#levelOfImportanceIn').val(),
        deadline: $('#deadlineIn').val(),
        complete: $('#completeIn').val(),
        additionalNotes: $('#additionalNotesIn').val()
        };
        if(taskToSend.actionItem === ''|| taskToSend.levelOfImportance === '' || taskToSend.deadline === '' || taskToSend.complete === '' || taskToSend.additionalNotes === ''){
            ('Please enter all fields.');
        } else if (koalaToSend.complete === 'YES' || taskToSend.complete === 'NO'){
            (taskToSend);
            clearInput();
        }else{
            ('Complete input must be YES or NO')
        }

    });
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);
    $('#viewTasks').on('click', '.uncompleteBtn', unCompleteTask);  

}
