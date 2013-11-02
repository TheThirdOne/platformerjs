Platformer.Entity = function(sprite){
	this.sprite = new Kinetic.Sprite(sprite);
};
Platformer.Entity.prototype={
	dy: 0,
	dx: 0,
	setDirection: function(direction){
		if(direction > 0){
			if(this.getScaleX() < 0){
	      		this.setScaleX(1);
	     		this.setX(this.sprite.getX() - this.getWidth()/2);
	    	}
	    }else{
	    	if(this.getScaleX() > 0){
		      this.setScaleX(-1);
		      this.setX(this.sprite.getX() + this.getWidth()/2);
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
	setX: function (x){
		this.sprite.setX(x);
	},
	getX: function (){
		this.sprite.getX();
	}
}