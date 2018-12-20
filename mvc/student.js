function onMouseDown(state, args){
	return state+1;
}

function onMouseDown2(obj, args){
	return {count: obj.count+1};
}

function counter3(){
	function onMouseDown(obj, args){
		return {count: obj.count+1};
	}
	return {controller: {onMouseDown} };
}

function counter4(){
	function onMouseDown(obj,args){
		return {count: obj.count+1};
	}
	function onKeyDown(){
		return {count: 0};
	}
	
	return {controller: {onMouseDown, onKeyDown} };
}

function counter5(){
	function onMouseDown(obj,args){
		if (args.shift){
			if (obj.count > 0){
				return {count: obj.count-1};
			}
			return {count: obj.count};
		}
		return {count: obj.count+1};
	}
	
	function onKeyDown(obj, args){
		if (args.key === ' ' || args.key === 'ArrowUp'){
			return {count: obj.count+1}
		}
		if (args.key === '0'){
			return {count: 0};
		}
		if (args.key === 'ArrowDown' && obj.count>0){
			return {count: obj.count-1};
		}
		return {count: obj.count};
	}
	
	return {controller: {onMouseDown, onKeyDown}};
}

function counter6(){
	function increment(obj){
		return {count: obj.count+1};
	}
	function decrement(obj){
		if (obj.count > 0){
			return {count: obj.count-1};
		}
		return {count: obj.count};
	}
	function reset(obj){
		return {count: 0};
	}
	function onMouseDown(obj,args){
		
		if (args.shift){
			return decrement(obj);
		}
		return increment(obj);
	}
	function onKeyDown(obj,args){
		if (args.key === ' ' || args.key === 'ArrowUp'){
			return increment(obj);
		}
		if (args.key === '0'){
			return reset(obj);
		}
		if (args.key === 'ArrowDown'){
			return decrement(obj);
		}
		return {count: obj.count};
	}
	
	const controller = { onMouseDown, onKeyDown};
	const model = {increment,decrement,reset};
	return {controller, model};
}

function counter7(){
	function add(obj, amount){
		if (obj.count+amount < 0){
			return reset(obj);
		}
		return {count: obj.count+amount};
	}
	function reset(obj){
		return {count: 0};
	}
	function onMouseDown(obj,args){
		let amount = 1;
		if (args.ctrl){
			amount = 5;
		}
		if (args.shift){
			amount *= -1;
		}
		return add(obj, amount);
	}
	function onKeyDown(obj, args){
		let amount = 1;
		if (args.key === '0'){
			return reset(obj);
		}
		if (args.ctrl){
			amount = 5;
		}
		if (args.key === ' ' || args.key === 'ArrowUp'){
			return add(obj,amount);
		}
		if (args.key === 'ArrowDown'){
			return add(obj,-amount);
		}
		return {count: obj.count};
	}
	const controller = {onMouseDown, onKeyDown};
	const model = {add, reset};
	return {controller, model};
}

function chronometer(){
	function timePassed(state, dt){
		return {elapsedTime: state.elapsedTime+dt};
	}
	function onTimerTick(state, dt){
		return timePassed(state,dt);
	}
	
	const model = {timePassed};
	const controller = {onTimerTick}
	return {model, controller};
}

function chronometer2(){
	function timePassed(state, dt){
		if (state.active){
			return {elapsedTime: state.elapsedTime+dt, active: state.active};
		}
		return {elapsedTime: state.elapsedTime, active: state.active};
	}
	function toggle(state){
		return {elapsedTime: state.elapsedTime, active: !state.active};
	}
	function reset(state){
		return {elapsedTime: 0, active: state.active};
	}
	function onTimerTick(state, dt){
		return timePassed(state,dt);
	}
	function onKeyDown(state,args){
		if (args.key === ' '){
			return toggle(state);
		}
		if (args.key === '0'){
			return reset(state);
		}
		return {elapsedTime: state.elapsedTime, active: state.active};
	}
	
	const model = {timePassed,toggle,reset};
	const controller = {onTimerTick,onKeyDown};
	return {model, controller};
}

function circle(){
	function render(state){
		return [{type: "circle", center: {x:100, y:100}, radius: 10, color: "red"}];
	}
	const model = {};
	const controller = {};
	const view = {render};
	return {model,controller,view};
}

function circle2(){
	function moveTo(state,position){
		return {position: position};
	}
	function onMouseDown(state,args){
		return moveTo(state,args.position);
	}
	function render(state){
		return [{type: "circle", center: state.position, radius: 10, color: "red"}];
	}
	
	const model = {moveTo};
	const controller = {onMouseDown};
	const view = {render};
	return {model,controller,view};
}

function circle3(){
	function moveTo(state,position){
		return {position: position};
	}
	function onMouseMove(state,args){
		return moveTo(state,args.position);
	}
	function render(state){
		return [{type: "circle", center: state.position, radius: 10, color: "red"}];
	}
	
	const model = {moveTo};
	const controller = {onMouseMove};
	const view = {render};
	return {model,controller,view};
}

function drawing(){
	function moveTo(state,position){
		let d = state.dots.slice(0);
		
		if (state.addMode){
			d.push(position);
		}
		return {position: position, dots: d, addMode: state.addMode};
	}
	function setAddMode(state,addMode){
		return {position: state.position, dots: state.dots, addMode: addMode};
	}
	function onMouseMove(state,args){
		return moveTo(state,args.position);
	}
	function onMouseDown(state,args){
		return setAddMode(state,true);
	}
	function onMouseUp(state,args){
		return setAddMode(state,false);
	}
	function render(state){
		let a = [{type: "circle", center: state.position, radius: 5, color: "red"}];
		if (state.addMode){
			a[0].radius = 2;
		}
		for (let i = state.dots.length-1; i>=0; i--){
			let b = {type: "circle", center: state.dots[i], radius: 2, color: "green"};
			a.unshift(b);
		}
		
		return a;
	}
	const model = {moveTo,setAddMode};
	const controller = {onMouseMove,onMouseDown,onMouseUp};
	const view = {render};
	return {model,controller,view};
}

function random(){
	function throwDie(state){
		let a = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693
		return {rng: a, dieValue: a%6 +1};
	}
	function onKeyDown(state,args){
		if (args.key === ' '){
			return throwDie(state);
		}
		return {rng: state.rng, dieValue: state.dieValue};
	}
	function render(state){
		return [{type: "text", position: {x:50,y:50}, string: state.dieValue.toString()}];
	}
	const model = {throwDie};
	const controller = {onKeyDown};
	const view = {render};
	return {model,controller,view};
}

function random2(){
	function nextRandom(n){
		return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
	}
	function throwDie(state){
		return [nextRandom(state.rng)%6 + 1, {rng: nextRandom(state.rng), grade: state.grade}];
	}
	function generateGrade(state){
		let teller = 0;
		let pseudorng = state.rng;
		let pseudograde = state.grade;
		for(let i = 0; i<3; i++){
			teller += throwDie({rng: pseudorng, grade: pseudograde})[0];
			pseudorng = throwDie({rng: pseudorng, grade:pseudograde})[1].rng;
		}
		
		return {rng: pseudorng, grade: teller};
	}
	function onKeyDown(state,args){
		if (args.key === ' '){
			return generateGrade(state);
		}
	}
	function render(state){
		return [{type: "text", position: {x:50,y:50}, string: state.grade.toString()}];
	}
	const model = {nextRandom,throwDie,generateGrade};
	const controller = {onKeyDown};
	const view = {render};
	return {model,controller,view};
}
