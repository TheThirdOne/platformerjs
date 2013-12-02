//True game code
var down = 83, left = 65, right = 68, up=87, attack=32, pause=80;
Platformer.initKeys();
function initKeys(){
	Platformer.setBindingUp(down, function(){console.log('hello')});
}
var constants = {
  playloop: 50
};
var person = {
  anims:[{name: 'idle', slides:[7]},
         {name: 'walk', slides:[0,1,2,3]},
         {name: 'jump', slides:[4,5]},
         {name: 'jump_stay', slides:[5]},
         {name: 'death', slides:[8,8,9,9,10,10]},
         {name: 'death_stay', slides:[10]}],
         columns:4,rows:4,width:32,height:64};
var knife = {
  anims:[{name: 'idle', slides:[3]},
         {name: 'stab', slides:[0,1,2]}],
         columns:4,rows:1,width:32,height:64};
var clock = {
  anims:[{name: 'run', slides:[0,1,2,3,4,5,6,7,0]},
         {name: 'idle', slides:[0]}],
         columns:4,rows:2,width:64,height:64};
var alarm = {
  anims:[{name: 'idle', slides:[0]},
         {name: 'alert', slides:[1,2,3,4]}],
         columns:4,rows:2,width:64,height:64};
var personanimation = Platformer.AnimationSet(person);
var thuganimation = Platformer.AnimationSet(person);
var knifeanimation = Platformer.AnimationSet(knife);
var clockanimation = Platformer.AnimationSet(clock);
var alarmanimation = Platformer.AnimationSet(alarm);
Platformer.onLoad = function(){
  console.log(Platformer.images);
  var back = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 1000,
        height: 400,
        fillPatternImage: Platformer.images[3]
      });
  levels[0] = new Platformer.Level({name: 0, init: init, destroy: destroy,player:{}});
  var layer = new Kinetic.Layer();
  var level = new Platformer.levelBase();
  layer.add(back);
  Platformer.init('container',600,600);
  Platformer.stage.add(layer);
 // level.clock.start();
  

};
Platformer.loadImages(['res/spy.png','res/thug.png','res/ground.png','res/concrete.png',
	'res/ladder.png','res/knife.png','res/crate.png','res/clock.png','res/alarm.png']);