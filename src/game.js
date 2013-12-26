Platformer.Level = function(options){
	this.name = options.name || "Unnamed Level";
	this.start = options.start || function(){};
	this.init = options.init;
	this.destroy = options.destroy || function(){};
	this.player = options.player;
	this.collision = Platformer.generateBlocks(options.collision);
	this.enemies = Platformer.generateEnemies(options.AI,options.enemies);
	this.offsetX = 0;
	this.offsetY = 0;
	Platformer.levelBase.call(this);
	if(this.init){
		this.init();
	}
};
Platformer.setLevelBase = function(func){
	Platformer.levelBase = func;
};
Platformer.generateBlocks = function(level){
		if(!level){return [];}
    var out = [];
    for(var i = 0; i < level.blocks.length; i++){
            out[i]= new Kinetic.Rect({x: level.blocks[i][0],y: level.blocks[i][1],
                    width: level.blocks[i][2],height:level.blocks[i][3],fillPatternImage: level.images[level.type[i]]});
    }
    return out;
};
Platformer.generateEnemies = function(AI,enemies){
        var out = [];
        if(!enemies){ return [];}
        for(var i = 0; i < enemies.length; i++){
                out[i]= new AI(enemies[i]);
        }
        return out;
};
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
	if(!level){
		return;
	}
	level.destroy();
};