//True game code
var down = 83, left = 65, right = 68, up=87, attack=32, pause=80;
Platformer.initKeys();
function initKeys(){
	Platformer.setBindingUp(down, function(){console.log('hello')})
}
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
  var layer = new Kinetic.Layer();
  var level = new levels.base();
  layer.add(back);
  Platformer.init('container',600,600);
  Platformer.stage.add(layer);
 // level.clock.start();
  

}
Platformer.loadImages(['res/spy.png','res/thug.png','res/ground.png','res/concrete.png',
	'res/ladder.png','res/knife.png','res/crate.png','res/clock.png','res/alarm.png']);
var levels = [];
levels.base = function(){
    this.clock = new Kinetic.Sprite({
      x: 904,
      y: 32,
      image: Platformer.images[7],
      animation: 'run',
      animations: clockanimation,
      frameRate: .88,
      index: 0,
      width: 64,
      height:64
    });
    this.alarm = new Kinetic.Sprite({
      x: 808,
      y: 32,
      image: Platformer.images[8],
      animation: 'idle',
      animations: alarmanimation,
      frameRate: 8,
      index: 0,
      width: 64,
      height:64
    });
    this.pauseText = new Kinetic.Text({
          x: 0,
          y: 60,
          text: 'Pause',
          fontSize: 200,
          fontFamily: 'Calibri',
          fill: '#FFF',
          width: 1000,
          padding: 20,
          align: 'center',
          visible: false
    });
    this.gameOver = new Kinetic.Text({
          x: 0,
          y: 300,
          text: 'Press any key to continue',
          fontSize: 60,
          fontFamily: 'Calibri',
          fill: '#FFF',
          width: 1000,
          padding: 20,
          align: 'center',
          visible: false
    });
    this.env = {
      goingLeft: false,
      goingRight: false,
      jumped: false,
      climb: false,
      fall: false,
      cloaked: 0,
      paused: false,
      alarms: 3
    };
    this.knife = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: Platformer.images[5],
      animation: 'idle',
      animations: knifeanimation,
      frameRate: 8,
      index: 0,
      width: 32,
      height:64
    });
    this.resetCloak = function(){
      this.env.cloaked = 0;
      this.clock.setAnimation('idle');
    };
    this.cloak = function(){
      this.env.cloaked++;
      if(this.clock.getAnimation() != 'run')
        this.clock.setAnimation('run');
    };
    this.win = function(){
      this.pauseText.setText('You Win');
      this.gameOver.setVisible(true);
      bindingsDown[pause]();
    };
  }