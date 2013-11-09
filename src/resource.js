Platformer.AnimationSet = function(data){
  var out = {};
  for(var i = 0; i < data.anims.length; i++){
    out[data.anims[i].name]=Platformer.Animation(data.anims[i].slides,data);
  }
  return out;
}
Platformer.Animation = function(slides, data){
  var x,y;
  var out=[];
  for(var i = 0; i < slides.length; i++){
    x = slides[i]%data.columns;
    y = Math.floor(slides[i]/data.columns);
    out[i] = {'x': x*data.width, 'y' : y*data.height,
           'width': data.width, 'height': data.height}
  }
  return out;
}
Platformer.init_sound = function(type, channels, volume){
  sounds[type]=[]
  for (a=0;a<channels;a++) {                  
    sounds[type][a] = {};
    sounds[type][a]['channel'] = new Audio();   
    sounds[type][a]['channel'].src = document.getElementById(type).src; 
    sounds[type][a]['channel'].load();      
    sounds[type][a]['finished'] = -1;
    if(volume)
      sounds[type][a]['channel'].volume = volume;         
  }
}
Platformer.play_multi_sound = function(s, start) {
  for (a=0;a<sounds[s].length;a++) {
    thistime = new Date();
    temp = sounds[s]
    if (sounds[s][a]['finished'] < thistime.getTime()) {      
      sounds[s][a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000 + start*1000;
      sounds[s][a]['channel'].currentTime = start;
      sounds[s][a]['channel'].play();
      break;
    }
  }
}
Platformer.loadImages = function(src){
  Platformer.images = [];
  Platformer.itemsToLoad = Platformer.itemsToLoad || 0;
  Platformer.itemsToLoad += src.length;
  function start(){
    Platformer.load();
  }
  for (var i = src.length - 1; i >= 0; i--) {
    Platformer.images[i] = new Image();
    Platformer.images[i].onload = start;
    Platformer.images[i].src = src[i]
  };
}