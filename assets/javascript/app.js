// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDvpql4lSqjSLY4_V1cFt0zZ_GK9vXI13c',
  authDomain: 'address-8890a.firebaseapp.com',
  databaseURL: 'https://address-8890a.firebaseio.com',
  projectId: 'address-8890a',
  storageBucket: '',
  messagingSenderId: '765705004411'
};

firebase.initializeApp(config);

var database = firebase.database();

$('#new-entry-btn').on('click', function() {
  clearInputAlerts();

  if(validateInput()) {
    var firstName = $('#first-name-input').val().trim();
    var lastName = $('#last-name-input').val().trim();
    var phone = $('#phone-input').val().trim();
    var email = $('#email-input').val().trim(); 

    var newEntry = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      inserted: firebase.database.ServerValue.TIMESTAMP,
    };

    //var key = database.ref().child('/entries').push().key;

    database.ref().child('contacts').push(newEntry);
  }
});

database.ref('contacts').on('child_added', function(snapshot) {
  console.log(snapshot.val());

  var tbody = $('#data');

  var tr = $('<tr></tr>');

  tr.append(createDataCell(snapshot.val().firstName, 'data-value', 'first-name'));

  tr.append(createDataCell(snapshot.val().lastName, 'data-value', 'last-name'));

  tr.append(createDataCell(snapshot.val().phone, 'data-value', 'phone'));

  tr.append(createDataCell(snapshot.val().email, 'data-value', 'email'));

  tr.append(addButtonCell('Edit', 'edit-btn'));

  tr.append(addButtonCell('Delete', 'delete-btn'));

  tbody.append(tr);
});

$(document).on('click', '.edit-btn', editEntry);

function validateInput() {
  var firstName = $('#first-name-input').val().trim();
  var lastName = $('#last-name-input').val().trim();
  var phone = $('#phone-input').val().trim();
  var email = $('#email-input').val().trim();

  if(firstName.length === 0) {
    setInputAlert('first-name-alert', '*Required value');

    return false;
  }

  if(lastName.length === 0) {
    setInputAlert('last-name-alert', '*Required value');

    return false;
  }

  if(phone.length === 0) {
    setInputAlert('phone-alert', '*Required value');

    return false;
  }

  if(email.length === 0) {
    setInputAlert('email-alert', '*Required value');

    return false;
  }

  return true;
}

function editEntry() {
  $(this).parent().siblings().each(function(){
    if($(this).attr('class') === 'data-value'){
      var value = $(this).text();
      
      // Change it to an input element
      var input = $('<input/>');

      switch($(this).attr('id')) {
        case 'first-name' :
          input.attr('id', 'first-name-input');
          break;
        case 'last-name' :
          input.attr('id', 'last-name-input');
          break;
        case 'phone' :
          input.attr('id', 'phone-input');
          break;
        case 'email' :
          input.attr('id', 'email-input');
          break;
        default:
          console.log('Unhandled id encountered ' + $(this).attr('id'));
      }

      input.attr('value', value);

      $(this).empty();
      $(this).html(input);
    }
  });
}

function clearInputAlerts() {
  $('#first-name-alert').empty();
  $('#last-name-alert').empty();
  $('#phone-alert').empty();
  $('#email-alert').empty();
}

function setInputAlert(elementId, message) {
  $('#' + elementId).text(message);
}

function createDataCell(data, className, idName) {
  var td = $('<td></td>');

  td.addClass(className);
  td.attr('id', idName);
  td.text(data);

  return td;
}

function addButtonCell(buttonName, classValue) {
  var button = $('<button></button>');

  button.text(buttonName);

  button.addClass('btn btn-primary btn-med ' + classValue);

  var td = $('<td></td>');

  td.append(button);

  return td;
}



/*
database.ref().on('value', function(snapshot) {
  $('#display-area').html(snapshot.child('firstName').val() + ' ' + snapshot.child('lastName').val());

},function(errorObject){
    console.log('Error encountered while attempting to write to the database!\n' + errorObject.errorCode);
});
*/