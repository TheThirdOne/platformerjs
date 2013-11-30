/**Tests if bottom of a sprite collides with with a group of other sprites**/
Platformer.onGround = function(sprite, children){
	return collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*0.2,sprite.getY()+sprite.getHeight(), children)||
	collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*0.8,sprite.getY()+sprite.getHeight(), children);
};
/**Tests if the top of a sprite collides with a group of other sprites**/
Platformer.collideHead = function(sprite, children){
	return  collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*0.2,sprite.getY(), children)||
	collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*0.8,sprite.getY(), children);
};
/**Tests if the leftof a sprite collides with a group of other sprites**/
Platformer.collideLeft = function(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*0.8, children)||
		collide(sprite.getX(),sprite.getY()+sprite.getHeight()*0.2, children);
	else
		return collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*0.8, children)||
		collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*0.2, children);
};
/**Tests if the Right of a sprite collides with a group of other sprites**/
Platformer.collideRight = function(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*0.8, children)||
		collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*0.2, children);
	else
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*0.8, children)||
		collide(sprite.getX(),sprite.getY()+sprite.getHeight()*0.2, children);
};
/**Tests if point intersects group of sprites**/
Platformer.collide = function(x,y,children){
	for(var i = 0; i < children.length; i++){
		if(testCollision(children[i],x,y))
			return true;
	}
	return false;
};
/**Tests if point intersects a sprite**/
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
};