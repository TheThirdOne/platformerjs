Platformer.Entity = function(sprite, options){
	this.sprite = new Kinetic.Sprite(sprite);
};
Platformer.Entity.prototype={
	dy: 0,
	dx: 0,
	/**Sets direction flipping about the middle*/
	setDirectionX: function(direction){
		if(direction > 0){
			if(this.getScaleX() < 0){
	      		this.setScaleX(1);
	     		this.setX(this.getX() - this.getWidth()/2);
	    	}
	    }else{
	    	if(this.getScaleX() > 0){
		      this.setScaleX(-1);
		      this.setX(this.getX() + this.getWidth()/2);
		    }
	    }
	},
	getScaleX: function(){
		this.sprite.getScaleX();
	},
	setScaleX: function(x){
		this.sprite.setScaleX(x);
	},
	getWidth: function(x){
		return this.sprite.getWitdh();
	},
	getHeight: function(x){
		return this.sprite.getHeight();
	},
	setX: function (x){
		this.sprite.setX(x);
	},
	getX: function (){
		this.sprite.getX();
	},
	setY: function (y){
		this.sprite.setY(y);
	},
	getY: function (){
		this.sprite.getY();
	}
}
Platformer.createPlayer = function(sprite,options){
	var temp = new Platformer.Entity(sprite,options);
	//temp does stuff
}
Platformer.Level = function(collision,AI,enemies,player,init,options){
	this.name = options.name || "Unnamed Level";
	this.init = init;
	this.destroy = options.destroy || function(){};
	this.player = player;
	this.collision = Platformer.generateCollisions(collision);
	this.enemies = Platformer.generateEnemies(AI,enemies);
	this.offsetX = 0;
	this.offsetY = 0;
	this.base = Platformer.levelBase();
}
Platformer.setLevelBase = function(func){
	Platformer.levelBase = func;
}
Platformer.generateCollisions = function(level){
        var out = [];
        for(var i = 0; i < level.blocks.length; i++){
                out[i]= new Kinetic.Rect({x: level.blocks[i][0],y: level.blocks[i][1],
                        width: level.blocks[i][2],height:level.blocks[i][3],fillPatternImage: level.type[i].image});
        }
        return out;
}
Platformer.generateEnemies = function(AI,enemies){
        var out = [];
        for(var i = 0; i < enemies.length; i++){
                out[i]= new AI(enemies[i])
        }
        return out;
}