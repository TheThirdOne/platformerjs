/**
 * Entity Constructor
 * @constructor 
 */
Platformer.Entity = function(sprite, options){
  this.sprite = new Kinetic.Sprite(sprite);
};
Platformer.Entity.prototype={
  dy: 0,
  dx: 0,
  /**
   * Sets direction flipping about the middle
   * @param {Number} direction + or - value to denote direction 
   * @param {Number} [flipX = .5] x value of axis of flip
   */
  setDirectionX: function(direction, flipX){
    flipX = flipX || 0.5;
    if(direction > 0){
      if(this.getScaleX() < 0){
          this.setScaleX(1);
          this.setX(this.getX()+this.getWidth()*(1-flipX));
        }
      }else{
        if(this.getScaleX() > 0){
          this.setScaleX(-1);
          this.setX(this.getX() + this.getWidth()*flipX);
        }
      }
  },
  /**
   * Gets scale in the X direction
   * @returns {Number} scale
   */
  getScaleX: function(){
    this.sprite.getScaleX();
  },
  /**
   * Sets scale in the X direction
   * @param {Number} x new scale value
   */
  setScaleX: function(x){
    this.sprite.setScaleX(x);
  },
  /**
   * Gets original width 
   * @returns {Number} width
   */
  getWidth: function(){
    return this.sprite.getWitdh();
  },
  /**
   * Sets original height
   * @returns {Number} height
   */
  getHeight: function(){
    return this.sprite.getHeight();
  },
  /**
   * Sets X
   * @param {Number} x
   */
  setX: function (x){
    this.sprite.setX(x);
  },
  /**
   * Gets X
   * @returns {Number} x
   */
  getX: function (){
    this.sprite.getX();
  },
  /**
   * Sets Y
   * @param {Number} y
   */
  setY: function (y){
    this.sprite.setY(y);
  },
  /**
   * Gets Y
   * @returns {Number} y
   */
  getY: function (){
    this.sprite.getY();
  }
};
/**
 * Player Constructor
 * @constructor 
 * @augments Platformer.Entity
 */
Platformer.Player = function(sprite,options){
  Platformer.Entity.call(this,sprite,options);
  //continues
};
Platformer.Player.prototype = Object.create(Platformer.Entity.prototype);
