'use strict';

var uuid = require('node-uuid');

module.exports = function(title, task, category) {
	this.id       = uuid.v1();
	this.title    = title;
  this.task     = task;
  this.category = category;
};
