function onGround(sprite, children){
	return collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.2,sprite.getY()+sprite.getHeight(), children)||
	       collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.8,sprite.getY()+sprite.getHeight(), children);
}
function collideHead(sprite, children){
	return  collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.2,sprite.getY(), children)||
	        collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*.8,sprite.getY(), children);
}
function collideLeft(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.2, children);
	else
		return collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*.2, children);
}
function collideRight(sprite, children){
	if(sprite.getScaleX() > 0)
		return collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*.2, children);
	else
		return collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.8, children)||
	           collide(sprite.getX(),sprite.getY()+sprite.getHeight()*.2, children);
}
function collide(x,y,children){
	if(!children){
		var temp = collision.getChildren();
	}else
		var temp = children
	for(var i = 0; i < temp.length; i++){
		if(testCollision(temp[i],x,y))
			return true;
	}
	return false;
}
function testCollision(object, x, y){
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