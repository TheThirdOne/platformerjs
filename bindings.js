Platformer.setUnlockKeyDown = function(func){
	Platformer.unlockKeyDown = func;
}
Platformer.setUnlockKeyUp = function(func){
	Platformer.unlockKeyUp = func;
}
Platformer.setBlockKeyDown = function(func){
	Platformer.blockKeyDown = func;
}
Platformer.setBlockKeyUp = function(func){
	Platformer.blockKeyUp = func;
}

Platformer.bindingsDown = [];
Platformer.bindingsUp = [];
Platformer.keysDownBuffer = [];
Platformer.keysUpBuffer = [];
Platformer.keys = [];

Platformer.setBindingDown = function(key, func){
	Platformer.bindingsDown[key]=func;
}
Platformer.setBindingUp = function(key, func){
	Platformer.bindingsDown[key]=func;
}
Platformer.moveBindingUp = function(from, to){
	Platformer.setBindingUp(to,Platformer.bindingsUp[from]);
	Platformer.setBindingUp(from,function(){});
}
Platformer.moveBindingDown = function(from, to){
	Platformer.setBindingDown(to,Platformer.bindingsDown[from]);
	Platformer.setBindingDown(from,function(){});
}
//Initializes keybindings. Resets block and unlock keys and onkeydown and onkeyup
Platformer.initKeys = function(up,down){
	Platformer.bindingsDown = down || [];
	Platformer.bindingsUp = up || [];
	Platformer.blockKeyUp = function(){
		return false;
	}
	Platformer.blockKeyDown = function(){
		return false;
	}
	Platformer.unlockKeyDown = function(){
		return false;
	}
	Platformer.unlockKeyUp = function(){
		return false;
	}
	document.onkeydown = function(evt){
	  if(!Platformer.keys[evt.keyCode]){
	    Platformer.keys[evt.keyCode] = true;
	    console.log(evt.keyCode);
	    if(!Platformer.blockKeyDown(evt) || Platformer.unlockKeyDown(evt))
	    	if(Platformer.bindingsDown[evt.keyCode])
	      		Platformer.bindingsDown[evt.keyCode]();
	  	else
	  		Platformer.keysDownBuffer.push(evt.keyCode);
	  }
	}
	document.onkeyup = function(evt){
	  Platformer.keys[evt.keyCode] = false;
	  if(!Platformer.blockKeyUp(evt) || Platformer.unlockKeyUp(evt)){
		  if(Platformer.bindingsUp[evt.keyCode])
		      Platformer.bindingsUp[evt.keyCode]();
		}else{
			Platformer.keysUpBuffer.push(evt.keyCode);
		}
	};
}