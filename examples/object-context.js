var createEvent = require('../index');

function Controller(name) {
  this.name = name;
}

function handleMessage(message) {
  console.log(this.name + " event handler triggered: " + message);
};

var myEvent = createEvent();

var controller1 = new Controller("Some Controller");
var controller2 = new Controller("Other Controller");

// 1. Subscribe everything
// We can specify subscribtion context
myEvent.subscribe(handleMessage);
myEvent.subscribe(handleMessage, controller1);
myEvent.subscribe(handleMessage, controller2);

// Emitting event without payload
// ~> log: "undefined event handler triggered: undefined"
//         "Some Controller event handler triggered: undefined"
//         "Other Controller event handler triggered: undefined"
myEvent.emit();

// Emitting event with payload
// ~> log: "undefined event handler triggered: undefined"
//         "Some Controller event handler triggered: Such data"
//         "Other Controller event handler triggered: Such data"
myEvent.emit("Such data");

// We need to wait here - event dispatching is asynchronous
// since the 'emit' method is promisified
setTimeout(function () {
  // 2. Unsubscribe one of the contexts
  myEvent.unsubscribe(handleMessage, controller1);
  console.log("2 listeners:")

  // Emitting event with payload
  // ~> log: "undefined event handler triggered: undefined"
  //         "Other Controller event handler triggered: Such data"
  myEvent.emit("Very event");
}, 300);

setTimeout(function () {
  // 3. Unsubscribe the method without context
  myEvent.unsubscribe(handleMessage);
  console.log("1 listener:")

  // Emitting event with payload
  // ~> log: "Other Controller event handler triggered: Such data"
  myEvent.emit("Wow!");
}, 600);
