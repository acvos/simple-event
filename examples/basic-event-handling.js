var createEvent = require('../index');

var myEvent = createEvent();
var otherEvent = createEvent();

function handleSimpleEvent() {
  console.log("Something's happened!!");
}

function handleMessage(data1, data2) {
  console.log("Message handler triggered...");

  if (data1) {
    console.log(data1);
  }

  if (data2) {
    console.log(data2);
  }
}

// We can subscribe multiple handlers to an event
// as well as the same handler to multiple events
myEvent.subscribe(handleSimpleEvent);
myEvent.subscribe(handleMessage);
otherEvent.subscribe(handleMessage);

// Emitting event with when promised payload gets resolved
var fakeAPI = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Wow Promise!");
  }, 300);
});

otherEvent.emit(fakeAPI);

// Emitting event without payload
myEvent.emit();

// Emitting event with payload
otherEvent.emit("Such data");

// Emitting event with payload
myEvent.emit("Such data", "Much message");

// This should produce following output:
//
// Something's happened!!
// Message handler triggered...
// Message handler triggered...
// Such data
// Something's happened!!
// Message handler triggered...
// Such data
// Much message
// Message handler triggered...
// Wow Promise!