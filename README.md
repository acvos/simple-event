# simple-event
Simple event implementation: dispatch payload to one or many listeners

## Motivation
This is an essential building block for any reactive-style library or application.

## Features
- Subscribe and unsubscribe listeners
- Optionally send any payload when emitting event
- Emit promises: the event will be fired off automatically when the promise resolves

## Installation

```
npm install simple-event
```

## Usage

```javascript

var simpleEvent = require('simple-event');

// Create event
var myEvent = simpleEvent();

// Subscribe a function
myEvent.subscribe(handleSimpleEvent);
myEvent.subscribe(function (data1, data2, data3) {
    .......
});

// Subscribe function in some context
myEvent.subscribe(function (message) {
    console.log(this.controllerName, message);
}, myController);

// Emit event
myEvent.emit();

// Emit some message
myEvent.emit(message, someExtraData);

// Emit promise: the event will be fired when the promise is resolved
var myData = $http.get('http://blah.com/data');
myEvent.emit(myData);

// Unsubscribe
myEvent.unsubscribe(handleSimpleEvent);

```