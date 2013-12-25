/**
 * Constructor for Binding
 * @constructor 
 */
Platformer.Binding = function(){
};
/** 
 * Sets overide for blockKey
 * @param {Function} unlockKeys overide blockKeys and force bindings to be called
 */
Platformer.Binding.prototype.setUnlockKeys = function(unlockKey){
	this.unlockKey = unlockKey;
};
/**
 * Stops bindings from occurring unless UnlockKeys is true
 * @param {Function} blockKeys block bindings from being called; instead have them be stored in keysBuffer
 */
Platformer.Binding.prototype.setBlockKeys = function(blockKey){
	this.blockKey = blockKey ;
};

Platformer.Binding.prototype.keyBuffer = [];
Platformer.Binding.prototype.keys = [];
/**
 * Sets a callback for a keycode on down
 * @param {Number} keycode Key to have the binding set to
 * @param {Function} callback Called on keydown
 */
Platformer.Binding.prototype.setBindingDown = function(key, func){
	this.bindingsDown[key]=func;
};
/**
 * Sets a callback for a keycode on up
 * @param {Number} keycode Key to have the binding set to
 * @param {Function} callback Called on keyup
 */
Platformer.Binding.prototype.setBindingUp = function(key, func){
	this.bindingsDown[key]=func;
};
/**
 * Moves a callback from one keycode to another
 * @param {Number} from source
 * @param {Number} to destination
 */
Platformer.Binding.prototype.moveBindingUp = function(from, to){
	this.setBindingUp(to,this.bindingsUp[from]);
	this.setBindingUp(from,function(){});
};
/**
 * Moves a callback from one keycode to another
 * @param {Number} from source
 * @param {Number} to destination
 */
Platformer.Binding.prototype.moveBindingDown = function(from, to){
	this.setBindingDown(to,this.bindingsDown[from]);
	this.setBindingDown(from,function(){});
};
/**
 * Initializes keybindings.
 * @param {Array} [up] array representing bindings for keyup
 * @param {Array} [down] array representing bindings for keydown
 */
Platformer.Binding.prototype.initKeys = function(up,down){
	this.bindingsDown = down || this.bindingsDown || [];//uses input, current value or []
	this.bindingsUp = up || this.bindingsUp || []; 
	this.keyBuffer = [];
	this.keys = [];
	this.blockKeys = this.blockKeys || function(){ //stick with current value or function(){return false}
		return false;
	};
	this.unlockKeys = this.unlockKeys || function(){
		return false;
	};
	var self = this
	document.onkeydown = function(evt){
    if(!self.keys[evt.keyCode]){
      self.keys[evt.keyCode] = true;
      console.log(evt.keyCode); //logs keyCode
      if(!self.blockKeys(evt) || self.unlockKeys(evt)){
        if(self.bindingsDown[evt.keyCode])
          self.bindingsDown[evt.keyCode](evt);
      }else
      self.keyBuffer.push(evt); //adds evt to be processed later
    }
	};
	document.onkeyup = function(evt){
    self.keys[evt.keyCode] = false;
    if(!self.blockKeys(evt) || self.unlockKeys(evt)){
      if(self.bindingsUp[evt.keyCode])
      self.bindingsUp[evt.keyCode](evt);
		}else{
			self.keyBuffer.push(evt); //adds evt to be processed later
		}
	};
};
