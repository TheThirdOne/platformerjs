Platformer.onGround = function(sprite, children){
	return collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.2,sprite.getY()+sprite.getHeight(), children)||
	       collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.8,sprite.getY()+sprite.getHeight(), children);
}
Platformer.collideHead = function(sprite, children){
	return  collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.2,sprite.getY(), children)||
	        collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.8,sprite.getY(), children);
}
Platformer.collideLeft = function(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.2, children);
	else
		return collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*.2, children);
}
Platformer.collideRight = function(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*.2, children);
	else
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.2, children);
}
Platformer.collide = function(x,y,children){
	for(var i = 0; i < children.length; i++){
		if(testCollision(children[i],x,y))
			return true;
	}
	return false;
}
Platformer.testCollision = function(object, x, y){
	if(object.getY() > y || object.getY() + object.getHeight() < y)
		return false;	
	if(object.getScaleX() > 0){
		if(object.getX() > x || object.getX() + object.getWidth() < x)
				return false;
	}else{
		if(object.getX() < x || object.getX() - object.getWidth() > x)
				return false;
	}
	return true;
}