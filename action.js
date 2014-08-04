var action = {};
var Action = function(enter,after,exit) {
	this.enterActionSequence = enter;
	this.afterActionSequence = after;
	this.exitActionSequence = exit;
};
Action.prototype.enterActionSequence = null;
Action.prototype.afterActionSequence = null;
Action.prototype.exitActionSequence = null;

Action.prototype.enter = function() {
	var _this = this;
	this.enterActionSequence.finish(function(){
		_this.after();
	});
	this.enterActionSequence.start();	
};
Action.prototype.after = function() {
	this.afterActionSequence.start();
};
Action.prototype.exit = function() {
	this.exitActionSequence.start();
};
Action.prototype.exitFinish = function(callback) {
	this.exitActionSequence.finish(callback);
};
Action.prototype.afterFinish = function(callback) {
	this.afterActionSequence.finish(callback);
}
action.getInstance = function (enter,after,exit) {
	return new Action(enter,after,exit);
};
module.exports = action;