PLatformer.Entity = function(sprite){
	this.sprite = new Kinect.Sprite(sprite);
	this.velocityX = 0;
	this.velocityY = 0;
	this.setX = function (x){
		this.sprite.setX(x);
	}
	this.setDirection = function(direction){
		if(direction > 0){
			if(this.sprite.getScaleX() < 0){
	      		this.sprite.setScaleX(1);
	     		this.setX(this.sprite.getX() - this.sprite.getWidth()/2);
	    	}
	    }else{
	    	if(this.sprite.getScaleX() > 0){
		      this.sprite.setScaleX(-1);
		      this.setX(this.sprite.getX() + this.sprite.getWidth()/2);
		    }
	    }
	}
};