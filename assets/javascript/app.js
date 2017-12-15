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
  //console.log(snapshot.val());

  var tbody = $('#data');

  var tr = $('<tr></tr>');

  tr.append(createDataCell(snapshot.val().firstName, 'data-value', 'first-name'));

  tr.append(createDataCell(snapshot.val().lastName, 'data-value', 'last-name'));

  tr.append(createDataCell(snapshot.val().phone, 'data-value', 'phone'));

  tr.append(createDataCell(snapshot.val().email, 'data-value', 'email'));

  tr.append(addButtonCell('Edit', 'edit-btn'));

  tr.append(addButtonCell('Cancel', 'cancel-btn'));

  tr.append(addButtonCell('Delete', 'delete-btn'));

  tbody.append(tr);
});

$(document).on('click', '.edit-btn', editEntry);

$(document).on('click', '.cancel-btn', cancelEditEntry);

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
  if($(this).text('Edit')) {
    enableDisableEdit(this, true);

     $(this).text('Submit');
  } else {
    // Submit
  }
}

function cancelEditEntry() {
  enableDisableEdit(this, false);
  
  // Rename submit button back to edit
  console.log($(this).parent().siblings().children('button').attr('class', 'btn btn-primary btn-med edit-btn'));

 // $(this).parent().siblings().children('button').attr('class', 'btn btn-primary btn-med edit-btn').text('Edit')
}

function enableDisableEdit(btnElement, enableEdit) {
  $(btnElement).parent().siblings().each(function() {
    // Each <td> tag has a class of "data-value"
    if($(this).attr('class') === 'data-value') {
        // Change it to an input element when edit has been selected
        if(enableEdit) {
          var value = $(this).text();

          var input = $('<input/>');

          var inputIdValue = $(this).attr('id') + '-input';

          input.attr('value', value);

          // Add the id used to identify this as a data input element
          input.attr('id', inputIdValue);

          $(this).empty();
          
          $(this).html(input);
        } else {
          // If execution reaches here, that means Cancel has been selected
          // Since the current state is Edit, data has to be pulled from each
          // input element using the val function.
          var value = $(this).children().attr('value');

          $(this).empty();

          $(this).text(value);
        }
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