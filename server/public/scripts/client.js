$(document).ready(function(){
    console.log('jq');
    //set up click Listeners
    setupClickListeners();
    //load existing tasks on page load
    // $('#taskBtn').on('click', addItem);
    getTasks();
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
        // saveTask(taskToSend);
        if(taskToSend.actionItem === ''|| taskToSend.levelOfImportance === '' || taskToSend.deadline === '' || taskToSend.complete === '' || taskToSend.additionalNotes === ''){
           alert('Please enter all fields.');
        } else if (taskToSend.complete.toLowerCase() === 'yes' || taskToSend.complete.toLowerCase() === 'no'){
            // (taskToSend);
            saveTask(taskToSend);
            clearInput();
        }else{
            alert('Complete input must be YES or NO')
        }

    });
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);
    $('#viewTasks').on('click', '.uncompleteBtn', unCompleteTask);  

}

//  tell server to get tasks from DB
function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
      type: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log(response);
      appendTasks(response);
    }).catch(function(error){
      console.log('error in GET', error);
    });
  }
  
  // POST request to submit task to DB
function saveTask(newTask) {
    $.ajax({
      method: 'POST',
      url: '/tasks',
      data: newTask
    }).then((response) => { 
      console.log('POST new Task');
    //   ("New task added to the pool!");
      getTasks();
    }).catch(function (error){ 
      console.log(error);
    })
  }

  //Append table and table data to DOM 
  function appendTasks(response) {
    $('#viewTasks').empty();
    for(let i = 0; i < response.length; i += 1) {
      let task = response[i];
    //   let $tr = $('<tr></tr>');
    //   $tr.data('task', task.id);
    //   $tr.append(`<td>${task.id}</td>`);
    //   $tr.append(`<td>${task.actionItem}</td>`);
    //   $tr.append(`<td>${task.levelOfImportance}</td>`);
    //   $tr.append(`<td>${task.deadline}</td>`);
    //   $tr.append(`<td>${task.complete}</td>`);
    //   $tr.append(`<td>${task.additionalNotes}</td>`);
    let $tr = $('<tr></tr>');
      if (task.complete.toLowerCase() === 'no') {
        // let $tr = $('<tr></tr>');
        $tr.data('task', task.id);
        $tr.append(`<td>${task.id}</td>`);
        $tr.append(`<td>${task.actionItem}</td>`);
        $tr.append(`<td>${task.levelOfImportance}</td>`);
        $tr.append(`<td>${task.deadline}</td>`);
        $tr.append(`<td>${task.complete}</td>`);
        $tr.append(`<td>${task.additionalNotes}</td>`);
        $tr.append(
          `<td><button class="completeBtn alert alert-success">Complete</button></td>`
        );
      } else {
        $tr = $('<tr class="color"></tr>');
      $tr.data('task', task.id);
      $tr.append(`<td>${task.id}</td>`);
      $tr.append(`<td>${task.actionItem}</td>`);
      $tr.append(`<td>${task.levelOfImportance}</td>`);
      $tr.append(`<td>${task.deadline}</td>`);
      $tr.append(`<td>${task.complete}</td>`);
      $tr.append(`<td>${task.additionalNotes}</td>`);
        $tr.append(
          `<td><button class="uncompleteBtn btn btn-warning">Mark as Incomplete</button></td>`
        );
      }
      $tr.append(
        `<td><button class="deleteBtn btn btn-danger">DELETE</button></td>`
      );      
      $('#viewTasks').append($tr);
      
    }
  }

 //DELETE rows from task list
  function deleteTask(){
    
    // .then((willDelete) => {
        let id = $(this).closest('tr').data('task');
        console.log(id)
        $.ajax({
      method: 'DELETE',
      url: `/Tasks/${id}`
    })
    .then(function(response){
      console.log('Deleted it!');
      getTasks();
    })
    .catch(function(error) {
      alert('Error on delete line 79', error);
    })
    
    }
  
  function completeTask() {
    console.log('Completing task!');
    // let colorToComplete = $(this).closest('tr').addClass("color");
    let idToComplete = $(this).closest('tr').data('task');
    let completeStatus = {
      complete: 'YES'
    };
    $.ajax({
      method: 'PUT',
      url: `/tasks/T/${idToComplete}`, 
      data: completeStatus
    }).then(function() {
      getTasks();
    }).catch(function(error) {
      console.log('In complete', error);
    })
  }
//Allows user to revers complete 
  function unCompleteTask () {
    console.log('Whops that was not complete!');
    // $(this).closest('tr').removeClass("color");
    let idToComplete = $(this).closest('tr').data('task');
    let completeStatus = {
      complete: 'NO'
    };
    $.ajax({
      method: 'PUT',
      url: `/tasks/U/${idToComplete}`, 
      data: completeStatus
    }).then(function() {
      getTasks();
    }).catch(function(error) {
      console.log('In uncomplete', error);
    })
  }
  //clears inputs after they have loaded
  function clearInput() {
    $('#actionItemIn').val(''),
    $('#levelOfImportanceIn').val(''),
    $('#deadlineIn').val(''),
    $('#completeIn').val(''),
    $('#additionalNotesIn').val('')
};
