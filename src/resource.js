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
 */
Platformer.ResourceManager.prototype.setOnload = function(onload){
  this.onLoad = onload;
  if(this.loaded){
    this.onLoad();
  }
};