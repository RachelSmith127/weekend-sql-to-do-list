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

  function appendKoalas(response) {
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
      if (task.readyForTransfer === 'NO') {
        $tr.append(
          `<td><button class="transferBtn btn btn-outline-info">Complete</button></td>`
        );
      } else {
        $tr.append(
          `<td><button class="unTransferBtn btn btn-outline-warning">not complete</button></td>`
        );
      }
      $tr.append(
        `<td><button class="deleteBtn btn btn-outline-danger">DELETE</button></td>`
      );      
      $('#viewTasks').append($tr);
    }
  }