'use strict';

var isEqual = require('is-equal');
var promisify = require('function-promisify');

function event() {
 var subscribers = [];

 function subscribe(callback, context) {
   subscribers.push({
     callback: callback,
     context: context
   });
 };

 function unsubscribe(callback, context) {
   subscribers = subscribers.filter(function (subscriber) {
     return !(isEqual(subscriber.callback, callback)
       && isEqual(subscriber.context, context));
   });
 };

 function emit() {
   var args = Array.prototype.slice.call(arguments);

   subscribers.forEach(function (subscriber) {
     subscriber.callback.apply(subscriber.context, args);
   });
 };

 return {
   subscribe: subscribe,
   unsubscribe: unsubscribe,
   emit: promisify(emit)
 };
}

module.exports = event;