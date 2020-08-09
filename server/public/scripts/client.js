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
        } else if (taskToSend.complete === 'YES' || taskToSend.complete === 'NO'){
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
  
  // POST request to submit koala to DB
function saveTask(newTask) {
    $.ajax({
      method: 'POST',
      url: '/tasks',
      data: newTask
    }).then((response) => { 
      console.log('POST new Task');
      ("New task added to the pool!", {
        
      });
      getTasks();
    }).catch(function (error){ 
      console.log(error);
    })
  }

  function appendTasks(response) {
    $('#viewTasks').empty();
    for(let i = 0; i < response.length; i += 1) {
      let task = response[i];
      let $tr = $('<tr></tr>');
      $tr.data('task', task.id);
      $tr.append(`<td>${task.actionItem}</td>`);
      $tr.append(`<td>${task.levelOfImportance}</td>`);
      $tr.append(`<td>${task.deadline}</td>`);
      $tr.append(`<td>${task.complete}</td>`);
      $tr.append(`<td>${task.additionalNotes}</td>`);
      if (task.complete === 'NO') {
        $tr.append(
          `<td><button class="completeBtn">Complete</button></td>`
        );
      } else {
        $tr.append(
          `<td><button class="uncompleteBtn">not complete</button></td>`
        );
      }
      $tr.append(
        `<td><button class="deleteBtn">DELETE</button></td>`
      );      
      $('#viewTasks').append($tr);
    }
  }

  function deleteTask(){
    ({
     
    }).then((willDelete) => {
        let id = $(this).closest('tr').data('task');
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
    
    })
  }
  function completeTask() {
    console.log('Completing task!');
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

  function unCompleteTask () {
    console.log('Whops that was not complete!');
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
      console.log('In unomplete', error);
    })
  }
  
  function clearInput() {
    $('#actionItemIn').val(''),
    $('#levelOfImportanceIn').val(''),
    $('#deadlineIn').val(''),
    $('#completeIn').val(''),
    $('#additionalNotesIn').val('')
};
