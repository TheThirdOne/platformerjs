var temp = function(){
  this.clock = new Kinetic.Sprite({
    x: 904,
    y: 32,
    image: Platformer.images[7],
    animation: 'run',
    animations: clockanimation,
    frameRate: 0.88,
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
  this.loop = function(){
    console.log('hello');
  };
};
Platformer.setLevelBase(temp);

var levels = [];
var init = function(){
  for(var i = 0; i < this.collision.length; i++){
    collision.add(this.collision[i]);
  }
  //stage.add(collision);
  for(var i = 0; i < this.ladders.length; i++){
    ladders.add(this.ladders[i]);
  }
  //stage.add(ladders);
  playerLayer.add(this.player);
  //stage.add(playerLayer);
  this.player.start();
  for(var i = 0; i < this.enemies.length;i++){
    enemies.add(this.enemies[i].sprite);
  }
  //stage.add(enemies);
  for(var i = 0; i < this.enemies.length;i++){
    this.enemies[i].sprite.start();
  }
  for(var i = 0; i < level.enemies.length;i++){
    hud.add(level.enemies[i].sight);
  }
  hud.add(this.base.clock);
  this.base.clock.start();
  hud.add(this.base.alarm);
  this.base.alarm.start();
  hud.add(this.base.pauseText);
  hud.add(this.base.gameOver);
  //stage.add(hud);
  this.interval = window.setInterval(this.loop,constants.playloop);
  init_bindings();
};
var destroy = function(){
  window.clearInterval(this.interval);
  var temp = collision.getChildren();
  for(var i = temp.length-1; 0 <= i; i--){
    temp[i].destroy();
  }
  temp = ladders.getChildren();
  for(var i = temp.length-1; 0 <= i; i--){
    temp[i].destroy();
  }
  temp = enemies.getChildren();
  for(var i = temp.length-1; 0 <= i; i--){
    temp[i].destroy();
  }
  temp = playerLayer.getChildren();
  for(var i = temp.length-1; 0 <= i; i--){
    temp[i].destroy();
  }
  temp = hud.getChildren();
  for(var i = temp.length-1; 0 <= i; i--){
    temp[i].destroy();
  }
};
levels[0] = new Platformer.Level({name: 0, init: init, destroy: destroy,player:{}});