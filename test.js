var action = require('./action');
var actionSequence = require('./actionSequence');	
var enterFistActionSequence = actionSequence.getInstance();
var _this = this;
enterFistActionSequence.add([function(){
	console.log("first enter action frame one task one");
},function(){
	console.log("first enter action frame one task two");
}],0);
enterFistActionSequence.add([function(){
	console.log("first enter action frame two task one");
},function(){
	console.log("first enter action frame two task two");
}],1000);

var afterFirstActionSequence = actionSequence.getInstance();
afterFirstActionSequence.add([function(){
	console.log("first after action frame one task one");
},function(){
	console.log("first after action frame one task two");
}],1000);
afterFirstActionSequence.add([function(){
	console.log("first after action frame two task one");
},function(){
	console.log("first after action frame two task two");
}],1000);

var exitFirstActionSequence = actionSequence.getInstance();
exitFirstActionSequence.add([function(){
	console.log("first exit action frame one task one");
},function(){
	console.log("first exit action frame one task two");
}],1000);
exitFirstActionSequence.add([function(){
	console.log("first exit action frame two task one");
},function(){
	console.log("first exit action frame two task two");
}],1000);
var enterSecoundActionSequence = actionSequence.getInstance();
enterSecoundActionSequence.add([function(){
	console.log("second enter action frame one task one");
},function(){
	console.log("second enter action frame one task two");
}],1000);
enterSecoundActionSequence.add([function(){
	console.log("second enter action frame two task one");
},function(){
	console.log("second enter action frame two task two");
}],1000);
var afterSecoundActionSequence = actionSequence.getInstance();
var exitSecoundActionSequence = actionSequence.getInstance();
var firstAction = action.getInstance(enterFistActionSequence, afterFirstActionSequence, exitFirstActionSequence);
var secondAction = action.getInstance(enterSecoundActionSequence, afterSecoundActionSequence, exitSecoundActionSequence);

var actions = [null,firstAction, secondAction];
for (var index = 1; index <= 2; index++) {
	(function(){
		var index1 = index;
		actions[index1].exitFinish(function(){
			if (index1+1 < actions.length)
				actions[index1+1].enter();
		});
		actions[index1].afterFinish(function(){
			actions[index1].exit();
		});
	})();
};
actions[1].enter();
	