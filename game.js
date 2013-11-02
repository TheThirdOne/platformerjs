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