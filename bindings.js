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
Platformer.setBindingDown= function(key, func){
	bindingsDown[key]=func;
}
Platformer.setBindingUp= function(key, func){
	bindingsDown[key]=func;
}
Platformer.init_keys = function(){
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
	  if(!keys[evt.keyCode]){
	    keys[evt.keyCode] = true;
	    console.log(evt.keyCode);
	    if(!Platformer.BlockKeyDown(evt) || Platformer.UnlockKeyDown(evt))
	    	if(bindingsDown[evt.keyCode])
	      		bindingsDown[evt.keyCode]();
	  	else
	  		Platformer.keysDownBuffer.push(evt.keyCode);
	  }
	}
	document.onkeyup = function(evt){
	  keys[evt.keyCode] = false;
	  if(!Platformer.BlockKeysUp(evt) || Platformer.UnlockKeyUp(evt)){
		  if(bindingsUp[evt.keyCode])
		      bindingsUp[evt.keyCode]();
		}else{
			Platformer.keysUpBuffer.push(evt.keyCode);
		}
	};
}