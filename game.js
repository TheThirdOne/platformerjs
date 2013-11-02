PLatformer.Entity = function(sprite){
	this.sprite = new Kinect.Sprite(sprite);
	this.velocityX = 0;
	this.velocityY = 0;
	this.getWidth = function(x){
		return this.sprite.getWitdh();
	}
	this.setX = function (x){
		this.sprite.setX(x);
	};
	this.getX = function (){
		this.sprite.getX();
	}
	this.setScaleX = function(x){
		this.sprite.setScaleX(x);
	};
	this.getScaleX = function(x){
		this.sprite.getScaleX(x);
	};
	this.setDirection = function(direction){
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
	};
};