//True game code
var down = 83, left = 65, right = 68, up=87, attack=32, pause=80;
Platformer.initKeys();
function initKeys(){
	Platformer.setBindingUp(down, function(){console.log('hello')})
}