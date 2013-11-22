var Platformer = {};
Platformer.playLevel = function(level){
	Platformer.reset(Platformer.currentLevel);
	Platformer.currentLevel = level;
	Platformer.currentLevel.start();
};
Platformer.load = function()
{
	Platformer.itemsToLoad--;
	if(Platformer.itemsToLoad === 0){
		Platformer.onLoad();
	}
};
Platformer.init=function(container,w,h)
{
	Platformer.stage = new Kinetic.Stage({
    container: container,
    width: w,
    height: h
	});
};
Platformer.reset = function(level){
	if(!level)
		return;
	level.destroy();
};