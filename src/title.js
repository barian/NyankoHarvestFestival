var gametitle = cc.Layer.extend({
  ctor: function() {
    this._super();

    //音楽再生エンジン
    audioEngine = cc.audioEngine;
    //bgm再生
    if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.title_bgm, true);
    }

    var size = cc.director.getWinSize();
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    var title = new start_button();
    title.setPosition(size.width / 2, size.height * 0.6);
    title.setScale(0.8);
    this.addChild(title);

    var help = cc.Sprite.create(res.help_png);　
    help.setPosition(size.width * 0.1, size.height * 0.1);
    this.addChild(help);

  }
});
var start_button = cc.Sprite.extend({
  ctor:function(){
    this._super();
    this.initWithFile(res.start_png);
    cc.eventManager.addListener(lis,this);
  }
});
var help_button = cc.Sprite.extend({
  ctor:function(){
    this._super();
    this.initWithFile(res.help_png);
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true
    },this);
    return true;
  },
  onTouchBegan: function(touch, event) {
    //ヒントのクリック判定
    cc.director.runScene(new HintScene());
    return true;
  }
});
// タップ処理
var touch_Listener = cc.eventManager.addListener({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,

  onTouchBegan: function(touch, event) {
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
    if (cc.rectContainsPoint(targetRectangle, location)) {
      cc.director.runScene(new gameScene());
    }
  },
});

var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var title = new gametitle();
        this.addChild(title);
    }
});
