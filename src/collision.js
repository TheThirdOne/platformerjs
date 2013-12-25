/**
 * Constructor for collision
 * @constructor
 */
Platformer.Collision = function(){
  
};
/**
 * Tests if bottom of a sprite collides with with a group of other sprites
 * 
 */
Platformer.Collision.prototype.collideBottom = function(sprite, children,width){
  width = width || 0.2;
	return this.collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*(width),sprite.getY()+sprite.getHeight(), children)||
	this.collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*(1-width),sprite.getY()+sprite.getHeight(), children);
};
/**
 * Tests if the top of a sprite collides with a group of other sprites
 */
Platformer.Collision.prototype.collideTop = function(sprite, children){
  width = width || 0.2;
	return  this.collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*width,sprite.getY(), children)||
	this.collide(sprite.getX() + sprite.getWidth()*sprite.getScaleX()*(1-width),sprite.getY(), children);
};
/**
 * Tests if the leftof a sprite collides with a group of other sprites
 */
Platformer.Collision.prototype.collideLeft = function(sprite, children){
  width = width || 0.2;
	if(sprite.getScaleX() > 0)
		return this.collide(sprite.getX(),sprite.getY()+sprite.getHeight()*(1-width), children)||
		this.collide(sprite.getX(),sprite.getY()+sprite.getHeight()*width, children);
	else
		return this.collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*(1-width), children)||
		this.collide(sprite.getX() - sprite.getWidth(),sprite.getY()+sprite.getHeight()*width, children);
};
/**
 * Tests if the Right of a sprite collides with a group of other sprites
 */
Platformer.Collision.prototype.collideRight = function(sprite, children){
  width = width || 0.2;
	if(sprite.getScaleX() > 0)
		return this.collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*(1-width), children)||
		this.collide(sprite.getX() + sprite.getWidth(),sprite.getY()+sprite.getHeight()*width, children);
	else
		return this.collide(sprite.getX(),sprite.getY()+sprite.getHeight()*(1-width), children)||
		this.collide(sprite.getX(),sprite.getY()+sprite.getHeight()*width, children);
};
/**
 * Tests if point intersects group of sprites
 */
Platformer.Collision.prototype.collide = function(x,y,children){
	for(var i = 0; i < children.length; i++){
		if(this.testCollision(children[i],x,y))
			return true;
	}
	return false;
};
/**
 * Tests if point intersects a sprite
 */
Platformer.Collision.prototype.testCollision = function(object, x, y){
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