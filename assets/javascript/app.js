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
  var firstName = $('#first-name-input').val();
  var lastName = $('#last-name-input').val();
  var phone = $('#phone-input').val();
  var email = $('#email-input').val();

  var newEntry = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    inserted: firebase.database.ServerValue.TIMESTAMP,
  };

  //var key = database.ref().child('/entries').push().key;

  database.ref().child('contacts').push(newEntry);

});

database.ref('contacts').on('child_added', function(snapshot) {
  console.log(snapshot.val());

  var tbody = $('#data');

  var tr = $('<tr></tr>');

  tr.append(createDataCell(snapshot.val().firstName));

  tr.append(createDataCell(snapshot.val().lastName));

  tr.append(createDataCell(snapshot.val().phone));

  tr.append(createDataCell(snapshot.val().email));

  tr.append(addButtonCell("Update"));

  tr.append(addButtonCell("Delete"));

  tbody.append(tr);
});

function createDataCell(data) {
  var td = $('<td></td>');

  td.text(data);

  return td;
}

function addButtonCell(buttonName) {
  var button = $('<button></button>');

  button.text(buttonName);

  button.addClass('btn btn-primary btn-med');

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