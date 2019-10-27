let gameArea = new Phaser.Scene('Game');

gameArea.init = function() {

  this.words = [
    {
      key: 'building',
      setXY: {
        x: 140,
        y: 310
      },
      spanish: 'edificio'
    },
    {
      key: 'house',
      setXY: {
        x: 320,
        y: 350
      },
      setScale: {
        x: 0.85
      },
      spanish: 'casa'
    },
    {
      key: 'car',
      setXY: {
        x: 480,
        y: 360
      },
      setScale: {
        x: 0.85
      },
      spanish: 'car'
    },
    {
      key: 'tree',
      setXY: {
        x: 610,
        y: 320
      },
      setScale: {
        x: 1.02
      },
      spanish: 'arbol'
    }
  ]


}

gameArea.preload = function() {

  this.load.image('background', 'assets/images/background-city.png')
  this.load.image('building', 'assets/images/building.png')
  this.load.image('car', 'assets/images/car.png')
  this.load.image('house', 'assets/images/house.png')
  this.load.image('tree', 'assets/images/tree.png')
  this.load.audio('treeAudio', 'assets/audio/arbol.mp3')
  this.load.audio('carAudio', 'assets/audio/auto.mp3')
  this.load.audio('houseAudio', 'assets/audio/casa.mp3')
  this.load.audio('buildingAudio', 'assets/audio/edificio.mp3')
  this.load.audio('correct', 'assets/audio/correct.mp3')
  this.load.audio('wrong', 'assets/audio/wrong.mp3')

};

gameArea.create = function() {



  this.items = this.add.group(this.words)

  let bg = this.add.sprite(40, 60, 'background').setOrigin(0, 0)

  bg.depth = -1;

  let items = this.items.getChildren();

  bg.setInteractive();

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    item.setInteractive();
    item.resizeTween = this.tweens.add({
      targets: item,
      scaleX: 1.1,
      scaleY: 1.05,
      duration: 650,
      paused: true,
      yoyo: true,
      ease: 'Quart.easeInOut'
    })


    
    item.on('pointerdown', pointer => {
      let result = this.answerCheck(this.words[i.spanish])
      item.resizeTween.restart()

      this.showQuestion()
    }, this)

    this.words[i].sound = this.sound.add(this.words[i].key + 'Audio')




  }

  this.wordText = this.add.text(30, 20, 'hello!', {
    font: '32px monospace',
    fill: '#fea100'
  })

  this.correctSound = this.sound.add('correct')
  this.wrongSound = this.sound.add('wrong')

  this.showQuestion();

  // let soundBegin = this.sound.add('correct')
  // soundBegin.play()

};

gameArea.showQuestion = function() {
  this.word = Phaser.Math.RND.pick(this.words)
  this.word.sound.play()

  this.wordText.setText(this.word.spanish)

}

gameArea.answerCheck = function(response) {

  if (response === this.word.spanish) {
    this.correctSound.play()
    return true;
  } else {
    this.wrongSound.play()
    return false;
  }

}

let cfg = {
  type: Phaser.AUTO,
  scene: gameArea,
  width: 720,
  height: 480,
  title: 'Learn Russia newbie',
  pixelArt: false,
};

let game = new Phaser.Game(cfg);