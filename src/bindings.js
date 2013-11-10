/**Makes bindings occur no matter what**/
Platformer.setUnlockKeys = function(func){
	Platformer.unlockKey = func;
}
/**Stops bindings from occurring unless UnlockKeys is true**/
Platformer.setBlockKeys = function(func){
	Platformer.blockKey = func;
}

Platformer.bindingsDown = [];
Platformer.bindingsUp = [];
Platformer.keyBuffer = [];
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
/**Initializes keybindings. Resets block and unlock keys and onkeydown and onkeyup**/
Platformer.initKeys = function(up,down){
	Platformer.bindingsDown = down || Platformer.bindingsDown ||[];
	Platformer.bindingsUp = up || Platformer.bindingsUp || [];
	Platformer.keyBuffer = [];
	Platformer.keys = [];
	Platformer.blockKeys = Platformer.blockKeys || function(){
		return false;
	}
	Platformer.unlockKeys = Platformer.unlockKeys || function(){
		return false;
	}
	document.onkeydown = function(evt){
	  if(!Platformer.keys[evt.keyCode]){
	    Platformer.keys[evt.keyCode] = true;
	    console.log(evt.keyCode);
	    if(!Platformer.blockKeys(evt) || Platformer.unlockKeys(evt))
	    	if(Platformer.bindingsDown[evt.keyCode])
	      		Platformer.bindingsDown[evt.keyCode](evt);
	  	else
	  		Platformer.keyBuffer.push(evt);
	  }
	}
	document.onkeyup = function(evt){
	  Platformer.keys[evt.keyCode] = false;
	  if(!Platformer.blockKeys(evt) || Platformer.unlockKeys(evt)){
		  if(Platformer.bindingsUp[evt.keyCode])
		      Platformer.bindingsUp[evt.keyCode](evt);
		}else{
			Platformer.keyBuffer.push(evt);
		}
	};
}