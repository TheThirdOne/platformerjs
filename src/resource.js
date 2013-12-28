Platformer.ResourceManager = function(){
  this.sounds = {};
  this.loaded = false;
};

Platformer.ResourceManager.AnimationSet = function(data){
  var out = {};
  for(var i = 0; i < data.anims.length; i++){
    out[data.anims[i].name]=Platformer.Animation(data.anims[i].slides,data);
  }
  return out;
};
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
Platformer.ResourceManager.prototype.play_multi_sound = function(s, start) {
  for (var a=0;a<this.sounds[s].length;a++) {
    thistime = new Date();
    temp = this.sounds[s];
    if (this.sounds[s][a].finished < thistime.getTime()) {      
      this.sounds[s][a].finished = thistime.getTime() + document.getElementById(s).duration*1000 + start*1000;
      this.sounds[s][a].channel.currentTime = start;
      this.sounds[s][a].channel.play();
      break;
    }
  }
};
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
Platformer.ResourceManager.prototype.load = function(){
  this.itemsToLoad--;
  if(this.itemsToLoad === 0){
    this.onLoad();
	}
};
Platformer.ResourceManager.prototype.onLoad = function(){
  this.loaded = true;
};
Platformer.ResourceManager.prototype.setOnload = function(onload){
  this.onLoad = onload;
  if(this.loaded){
    this.onLoad();
  }
};