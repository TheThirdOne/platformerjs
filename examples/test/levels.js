var temp = function(){
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
  this.loop = function(){
    console.log('hello');
  }
}
Platformer.setLevelBase(temp);