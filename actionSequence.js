Array.prototype.each =  function ( callback ){  
	for (  var  i = 0 ,j =  this .length ; i < j ; i++ ){  
    	callback.call(this, i, this[i]);  
    }     
}

var actionSequence = {};
var ActionSequence = function() {
	this.tasks = [];
	this.timeoutArr = [];
};
ActionSequence.prototype.add = function(functions, waitTime) {
	this.tasks.push({functions:functions,waitTime:waitTime});
};
ActionSequence.prototype.tasks = null;
ActionSequence.prototype.current = -1;
ActionSequence.prototype.lock = 0;
ActionSequence.prototype.timeoutArr = null;
ActionSequence.prototype.start = function() {
	this.next();
};
ActionSequence.prototype.next = function() {
	if (this.lock !== 0) return;
	this.current++;
	if (this.current === this.tasks.length) {
		this.current = -1;
		this.finish();
		return;
	}
	var functions = this.tasks[this.current].functions;
	var waitTime = this.tasks[this.current].waitTime;
	this.timeoutArr.length = 0;
	var _this = this;
	functions.each(function(index, element){
		_this.lock++;
		var t = setTimeout(function(){
			element();
			_this.lock--;
			_this.next();
		},waitTime);
		_this.timeoutArr.push(t);
	});
};
ActionSequence.prototype.finish = function(callback) {
	if (typeof callback === 'function') {
		this.onFinish = callback;
	} else {
		//console.log(this.onFinish);
		this.onFinish();
	}
};
ActionSequence.prototype.onFinish = function() {};

ActionSequence.prototype.stop = function() {
	this.timeoutArr.each(function(index, element){
		clearTimeout(element);
	});
};

actionSequence.getInstance = function() {
	return new ActionSequence();
};
module.exports = actionSequence;