/**
 * Level Constructor
 * @constructor
 */
Platformer.Level = function(base,options){
  this.name = options.name || "Unnamed Level";
  this.start = options.start || function(){};
  this.init = options.init;
  this.destroy = options.destroy || function(){};
  this.player = options.player;
  this.collision = Platformer.Game.generateBlocks(options.collision);
  this.enemies = Platformer.Game.generateEnemies(options.AI,options.enemies);
  this.offsetX = 0;
  this.offsetY = 0;
  base.call(this);
  if(this.init){
    this.init();
  }
};
/**
 * Game Constructor
 * @constructor
 * @param {Platformer.ResourceManager} manager resourcemanagermto use for loading images and sounds
 */
Platformer.Game = function(resourceManger){
  
};
/**
 * Adds a level
 */
Platformer.Game.prototype.addLevel = function(){

};
/**
 * Sets a base level to build new levels off of
 */
Platformer.Game.prototype.setLevelBase = function(func){
  this.levelBase = func;
};
/**
 * Generates an array of blocks to represent collision meshes
 */
Platformer.Game.generateBlocks = function(level){
    if(!level){return [];}
    var out = [];
    for(var i = 0; i < level.blocks.length; i++){
            out[i]= new Kinetic.Rect({x: level.blocks[i][0],y: level.blocks[i][1],
                    width: level.blocks[i][2],height:level.blocks[i][3],fillPatternImage: level.images[level.type[i]]});
    }
    return out;
};
/**
 * Generates Enemies given a base template and array of options
 */
Platformer.Game.generateEnemies = function(AI,enemies){
        var out = [];
        if(!enemies){ return [];}
        for(var i = 0; i < enemies.length; i++){
                out[i]= new AI(enemies[i]);
        }
        return out;
};
/**
 * Playes a certain level
 */
Platformer.Game.prototype.playLevel = function(level){
  this.reset(Platformer.currentLevel);
  this.currentLevel = level;
  this.currentLevel.start();
};
/**
 * Initializes the game object. Probably should be moved to the contructor.
 */
Platformer.Game.prototype.init=function(container,w,h)
{
  this.stage = new Kinetic.Stage({
    container: container,
    width: w,
    height: h
  });
};
/**
 * Resets a level of a game.
 */
Platformer.Game.prototype.reset = function(level){
  if(!level){
    return;
  }
  level.destroy();
};