/**
 * Entity Constructor
 *@constructor 
 */
Platformer.Entity = function(sprite, options){
	this.sprite = new Kinetic.Sprite(sprite);
};
Platformer.Entity.prototype={
	dy: 0,
	dx: 0,
	/**
	 * Sets direction flipping about the middle
	 * @param {Number} direction + or - value to denote direction 
	 * @param {Number} [flipX] x value of axis of flip (default: .5)
	 */
	setDirectionX: function(direction, flipX){
    flipX = flipX || 0.5;
		if(direction > 0){
			if(this.getScaleX() < 0){
          this.setScaleX(1);
          this.setX(this.getX()+this.getWidth()*(1-flipX));
        }
      }else{
        if(this.getScaleX() > 0){
          this.setScaleX(-1);
          this.setX(this.getX() + this.getWidth()*flipX);
        }
      }
	},
	/**
	 * Gets scale in the X direction
	 * @returns {Number} scale
	 */
	getScaleX: function(){
		this.sprite.getScaleX();
	},
	/**
	 * Sets scale in the X direction
	 * @param {Number} x new scale value
	 */
	setScaleX: function(x){
		this.sprite.setScaleX(x);
	},
	/**
	 * Gets original width 
	 * @returns {Number} width
	 */
	getWidth: function(){
		return this.sprite.getWitdh();
	},
	/**
	 * Sets original height
	 * @returns {Number} height
	 */
	getHeight: function(){
		return this.sprite.getHeight();
	},
	/**
	 * Sets X
	 * @param {Number} x
	 */
	setX: function (x){
		this.sprite.setX(x);
	},
	/**
	 * Gets X
	 * @returns {Number} x
	 */
	getX: function (){
		this.sprite.getX();
	},
	/**
	 * Sets Y
	 * @param {Number} y
	 */
	setY: function (y){
		this.sprite.setY(y);
	},
	/**
	 * Gets Y
	 * @returns {Number} y
	 */
	getY: function (){
		this.sprite.getY();
	}
};
Platformer.createPlayer = function(sprite,options){
	var temp = new Platformer.Entity(sprite,options);
	//temp does stuff
};
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