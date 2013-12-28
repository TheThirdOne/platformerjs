/**
 * Constructor for collision
 * @constructor
 */
Platformer.Collision = function(){
  
};
/**
 * Tests if bottom of a entity collides with with a group of other entities
 * @param {Platformer.Entity} entity entity to check for collision
 * @param {Array} entities array of entities to check against
 * @param {Number} [width = .2] distance from the edge of the entity to test on a scale of 0-.5 
 * @returns {Boolean} collides if the entity collides
 */
Platformer.Collision.prototype.collideBottom = function(entity, children, width){
  width = width || 0.2;
	return this.collide(entity.getX() + entity.getWidth()*entity.getScaleX()*(width),entity.getY()+entity.getHeight(), children)||
	this.collide(entity.getX() + entity.getWidth()*entity.getScaleX()*(1-width),entity.getY()+entity.getHeight(), children);
};
/**
 * Tests if the top of a entity collides with a group of other entities
 * @param {Platformer.Entity} entity entity to check for collision
 * @param {Array} entities array of entities to check against
 * @param {Number} [width = .2] distance from the edge of the entity to test on a scale of 0-.5  
 * @returns {Boolean} collides if the entity collides
 */
Platformer.Collision.prototype.collideTop = function(entity, children, width){
  width = width || 0.2;
	return  this.collide(entity.getX() + entity.getWidth()*entity.getScaleX()*width,entity.getY(), children)||
	this.collide(entity.getX() + entity.getWidth()*entity.getScaleX()*(1-width),entity.getY(), children);
};
/**
 * Tests if the left of a entity collides with a group of other entities
 * @param {Platformer.Entity} entity entity to check for collision
 * @param {Array} entities array of entities to check against
 * @param {Number} [height = .2] distance from the edge of the entity to test on a scale of 0-.5  
 * @returns {Boolean} collides if the entity collides
 */
Platformer.Collision.prototype.collideLeft = function(entity, children, height){
  height = height || 0.2;
	if(entity.getScaleX() > 0){
		return this.collide(entity.getX(),entity.getY()+entity.getHeight()*(1-height), children)||
		this.collide(entity.getX(),entity.getY()+entity.getHeight()*height, children);
	}else{
		return this.collide(entity.getX() - entity.getWidth(),entity.getY()+entity.getHeight()*(1-height), children)||
		this.collide(entity.getX() - entity.getWidth(),entity.getY()+entity.getHeight()*height, children);
	}
};
/**
 * Tests if the Right of a entity collides with a group of other entities
 * @param {Platformer.Entity} entity entity to check for collision
 * @param {Array} entities array of entities to check against
 * @param {Number} [height = .2] distance from the edge of the entity to test on a scale of 0-.5  
 * @returns {Boolean} collides if the entity collides
 */
Platformer.Collision.prototype.collideRight = function(entity, children, height){
  height = height || 0.2;
	if(entity.getScaleX() > 0){
		return this.collide(entity.getX() + entity.getheight(),entity.getY()+entity.getHeight()*(1-height), children)||
		this.collide(entity.getX() + entity.getWidth(),entity.getY()+entity.getHeight()*height, children);
	}else{
		return this.collide(entity.getX(),entity.getY()+entity.getHeight()*(1-height), children)||
		this.collide(entity.getX(),entity.getY()+entity.getHeight()*height, children);
	}
};
/**
 * Tests if point intersects group of entities
 * @param {Number} x x position of the point
 * @param {Number} y y position of the point
 * @param {Array} entities entities to test against
 * @returns {Boolean} collides if the point collides
 */
Platformer.Collision.prototype.collide = function(x,y,children){
	for(var i = 0; i < children.length; i++){
		if(x, y, this.testCollision(children[i])){
			return true;
		}
	}
	return false;
};
/**
 * Tests if point intersects a entity
 * @param {Number} x x position of the point
 * @param {Number} y y position of the point
 * @param {Platformer.Entity} entity  entity to test against
 * @returns {Boolean} collides if the entity collides with the point
 */
Platformer.Collision.prototype.testCollision = function(x, y, object){
	if(object.getY() > y || object.getY() + object.getHeight() < y){
		return false;	
	}
	if(object.getScaleX() > 0){
		if(object.getX() > x || object.getX() + object.getWidth() < x){
				return false;
		}
	}else{
		if(object.getX() < x || object.getX() - object.getWidth() > x){
				return false;
    }
	}
	return true;
};