$(document).ready(onReady);

function addItem(e){
    e.preventDefault();
    console.log('in addItem');
}


function onReady(){
    $('#taskBtn').on('click', addItem);
}
