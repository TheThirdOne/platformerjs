/**
 * Resaource manager 
 * @constructor
 */
Platformer.ResourceManager = function(){
  this.sounds = {};
  this.loaded = false;
};
/**
 * Loads a set of KineticJS animations  
 * @param {Object} data see example for the format
 * @example 
 * {
 *   anims:[{name: 'idle', slides:[7]},
 *          {name: 'run', slides:[0,1,2,3]},
 *          {name: 'jump', slides:[4,5,6]},
 *          {name: 'jump_stay', slides:[6]}],
 *   columns:4,rows:2,width:32,height:64
 * }
 */
Platformer.ResourceManager.AnimationSet = function(data){
  var out = {};
  for(var i = 0; i < data.anims.length; i++){
    out[data.anims[i].name]=Platformer.ResourceManager.Animation(data.anims[i].slides,data);
  }
  return out;
};
/**
 * Makes a single animation from a abstracted data type
 * @param {Array} slides the indexes of sprites in the spritesheet
 * @param {Object} data see AnimationSet's data object
 */
Platformer.ResourceManager.Animation = function(slides, data){
  var x,y;
  var out=[];
  for(var i = 0; i < slides.length; i++){
    x = slides[i]%data.columns;
    y = Math.floor(slides[i]/data.columns);
    out[i] = {'x': x*data.width, 'y' : y*data.height,
           'width': data.width, 'height': data.height};
  }
  return out;
};
/**
 * Initializes a sound file for overlapping playback
 * @param {String} name name for the sound
 * @param {Number} channels number of channels to allocate
 * @param {Number} volume 
 */
Platformer.ResourceManager.prototype.init_sound = function(type, channels, volume){
  this.sounds[type]=[];
  for (var a=0;a<channels;a++) {                  
    this.sounds[type][a] = {};
    this.sounds[type][a].channel = new Audio();   
    this.sounds[type][a].channel.src = document.getElementById(type).src; 
    this.sounds[type][a].channel.load();      
    this.sounds[type][a].finished = -1;
    if(volume){
      this.sounds[type][a].channel.volume = volume;
    }
  }
};
/**
 * Play an initialized sound
 * @param {String} name name of sound to play
 * @param {Number} start time to start
 */
Platformer.ResourceManager.prototype.play_multi_sound = function(s, start) {
  var temp, thistime = new Date();
  for (var a=0;a<this.sounds[s].length;a++) {
    temp = this.sounds[s];
    if (this.sounds[s][a].finished < thistime.getTime()) {      
      this.sounds[s][a].finished = thistime.getTime() + document.getElementById(s).duration*1000 + start*1000;
      this.sounds[s][a].channel.currentTime = start;
      this.sounds[s][a].channel.play();
      break;
    }
  }
};
/**
 * Loads an array of images for later use
 * @param {Array} src array of paths to load images from 
 */
Platformer.ResourceManager.prototype.loadImages = function(src){
  this.images = [];
  this.itemsToLoad = this.itemsToLoad || 0;
  this.itemsToLoad += src.length;
  var self = this;
  function start(){
    self.load();
  }
  for (var i = src.length - 1; i >= 0; i--) {
    this.images[i] = new Image();
    this.images[i].onload = start;
    this.images[i].src = src[i];
  }
};
/**
 * Internal function used for calling the onload Callback
 */
Platformer.ResourceManager.prototype.load = function(){
  this.itemsToLoad--;
  if(this.itemsToLoad === 0){
    this.onLoad();
  
  
  }
};
/**
 * Default callback to detect wether everythin has been loaded
 */
Platformer.ResourceManager.prototype.onLoad = function(){
  this.loaded = true;
};
/**
 * Sets callback to be called upon all images being loaded
 * @param {onload} onload callback to be called on all images being loaded
 */
Platformer.ResourceManager.prototype.setOnload = function(onload){
  this.onLoad = onload;
  if(this.loaded){
    this.onLoad();
  }
};