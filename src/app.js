var itemsLayer;
var cat;
var basket;
var xSpeed = 0; //カートの移動速度
var time = 60; //制限時間
<<<<<<< HEAD
var start_timer = 0; //スターと時間
var second_timer = 0;//秒間にする時間
=======
>>>>>>> origin/gh-pages
var score1 = 0; //リンゴの1桁
var score2 = 0; //リンゴの2桁
var score3 = 0; //リンゴの3桁
var em = 0;

<<<<<<< HEAD
var countdown = 4;//countdown

=======
>>>>>>> origin/gh-pages
var touchOrigin; //タッチ開始したときに表示するスプライト
var touching = false; //タッチしているかFlag
var touchEnd; //タッチが終了したときに表示するスプライト

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    background.setScale(0.48,0.42);
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

<<<<<<< HEAD
    //countdownを表示させる
    countdown_png = cc.Sprite.create(res.number03_png);
    countdown_png.setPosition(size.width/2,size.height/2);
    this.addChild(countdown_png);
=======
>>>>>>> origin/gh-pages
    //timerの表示
    var counter = new cc.Sprite(res.timer);
    counter.setScale(0.5);
    counter.setPosition(cc.p(size.width / 8 ,size.height / 1.1));
    var counterLayer = cc.Layer.create();
    counterLayer.addChild(counter,0);
    this.addChild(counterLayer);
    //timeの表示
    timeText = cc.LabelTTF.create(""+time,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(timeText);
    timeText.fillStyle = "brack";
    timeText.setPosition(65,285);

    //counterの表示
    var counter = new cc.Sprite(res.counter);
    counter.setScale(0.5);
    counter.setPosition(cc.p(size.width / 1.15 , 25));
    var counterLayer = cc.Layer.create();
    counterLayer.addChild(counter,0);
    this.addChild(counterLayer);

    //scoreの表示
    scoreText1 = cc.LabelTTF.create(""+score1,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText1);
    scoreText1.fillStyle = "black";
    scoreText1.setPosition(465,16);
    scoreText2 = cc.LabelTTF.create(""+score2,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText2);
    scoreText2.fillStyle = "black";
    scoreText2.setPosition(435,16);
    scoreText3 = cc.LabelTTF.create(""+score3,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText3);
    scoreText3.fillStyle = "black";
    scoreText3.setPosition(405,16);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    itemsLayer.setScale(0.5);
    this.addChild(itemsLayer);

    //プレイヤーを操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    cat = cc.Sprite.create(res.cat0_png);
    cat.setScale(0.4);
    basket = cc.Sprite.create(res.basket1);
    basket.setScale(0.4);
    topLayer.addChild(basket, 0)
    cat.setPosition(240, 60);
    basket.setPosition(255, 75);
    topLayer.addChild(cat, 0);

    this.schedule(this.addItem, 0.1);

    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);

    //playerの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();
  },
  addItem: function() {
    var item = new Item();
<<<<<<< HEAD
    if(countdown < 0){
    itemsLayer.addChild(item, 1);
  }
=======
    itemsLayer.addChild(item, 1);
>>>>>>> origin/gh-pages
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {
    if (touching) {
    //touchEnd(ドラックしている位置）とタッチ開始位置の差を計算する
    //そのままだと値が大きすぎるので50で割る
    em++;
    if(em == 120)em = 0;
    if(em == 0)cat.initWithFile(res.cat0_png);
    if(em == 30 || em == 90)cat.initWithFile(res.cat1_png);
    if(em == 60)cat.initWithFile(res.cat2_png);
    xSpeed = (touchEnd.getPosition().x - touchOrigin.getPosition().x) / 30;
      if (xSpeed > 0 && touchOrigin.getPosition().x+10 > touchOrigin.getPosition().x) {
        cat.setFlippedX(true);
        basket.setFlippedX(true);
        basket.setPosition(cat.getPosition().x-15, cat.getPosition().y+15);
      }
      if (xSpeed < 0 && touchEnd.getPosition().x < touchOrigin.getPosition().x) {
        cat.setFlippedX(false);
        basket.setFlippedX(false);
        basket.setPosition(cat.getPosition().x+15, cat.getPosition().y+15);
      }
      cat.setPosition(cat.getPosition().x + xSpeed, cat.getPosition().y);

      basket.setPosition(basket.getPosition().x + xSpeed, basket.getPosition().y);
    }
    gameLayer.removeChild(scoreText1);
    gameLayer.removeChild(scoreText2);
    gameLayer.removeChild(scoreText3);
    scoreText1 = cc.LabelTTF.create(""+score1,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText1);
    scoreText1.fillStyle = "black";
    scoreText1.setPosition(465,16);
    scoreText2 = cc.LabelTTF.create(""+score2,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText2);
    scoreText2.fillStyle = "black";
    scoreText2.setPosition(435,16);
    scoreText3 = cc.LabelTTF.create(""+score3,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText3);
    scoreText3.fillStyle = "black";
    scoreText3.setPosition(405,16);
    if(score2 == 2 && score3 == 0)basket.initWithFile(res.basket2);
    if(score2 == 4 && score3 == 0)basket.initWithFile(res.basket3);
    if(score2 == 8 && score3 == 0)basket.initWithFile(res.basket4);
<<<<<<< HEAD
    //カウントダウン処理
    if(countdown > -1 ){
    start_timer++;
      if(start_timer == 70){
        console.log(countdown-1);
        start_timer = 0;
        countdown--;
          if(countdown == 3) countdown_png.setTexture(res.number02_png);
          if(countdown == 2) countdown_png.setTexture(res.number01_png);
          if(countdown == 1) countdown_png.setTexture(res.go);

      }
    }


    if(countdown < 0){
      //カウントダウン画像消す
      countdown_png.setVisible(false);

    //制限時間
    second_timer++;

    if(second_timer == 60){
      time--;
      second_timer = 0;
      timeText.setString(time);
    }
    if(time == 0){
      cc.director.runScene(new GameStartScene()); //リザルトへ
    }
  }
  },

});
var Item = cc.Sprite.extend ({
=======
  }

});
function timer(){
  this.addChild(timeText);
}
var Item = cc.Sprite.extend({
>>>>>>> origin/gh-pages
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    if (Math.random() < 0.5) {
      this.initWithFile(res.bug_png);
      this.isbug = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isbug = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 250);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(2, new cc.Point(Math.random() * 400 + 40, -110));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //果物の処理　座標をチェックしてカートの接近したら
    if (this.getPosition().y < 30 &&
      Math.abs(this.getPosition().x - basket.getPosition().x) < 30 && !this.isbug) {
      score1++;
      if(score1 == 10){
        score1 = 0;
        score2++;
        if(score2 == 10){
          score2 = 0;
          score3++;
        }
      }
      gameLayer.removeItem(this);

    }
    //爆弾の処理　座標をチェックしてカートの接近したら　フルーツより爆弾に当たりやすくしている
    if (this.getPosition().y < 35 && Math.abs(this.getPosition().x - cat.getPosition().x) < 25 &&
      this.isbug) {
<<<<<<< HEAD

=======
>>>>>>> origin/gh-pages
      gameLayer.removeItem(this);

    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -100) {
<<<<<<< HEAD
      this.Itemtimer = 60;
      this.Itemtimer--;
      if(this.Itemtimer == 0){
        gameLayer.removeItem(this)
      }
=======

      gameLayer.removeItem(this)
>>>>>>> origin/gh-pages
    }
  }
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    //タッチ開始位置にスプライトを表示させる
    touchOrigin = cc.Sprite.create(res.touchorigin_png);
    topLayer.addChild(touchOrigin, 0);
    touchOrigin.setPosition(touch.getLocation().x, touch.getLocation().y);
　　//タッチ位置にドラック用スプライトを表示させる
    touchEnd = cc.Sprite.create(res.touchend_png);
    topLayer.addChild(touchEnd, 0);
    touchEnd.setPosition(touch.getLocation().x, touch.getLocation().y);
    //タッチしているぞflagをON
    touching = true;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //移動中の指の位置にドラック用スプライトを表示させる
    touchEnd.setPosition(touch.getLocation().x, touchEnd.getPosition().y);
  },
  onTouchEnded: function(touch, event) {
    //タッチ終了のときはスプライトを消す　タッチflagをOFF
    touching = false;
    topLayer.removeChild(touchOrigin);
    topLayer.removeChild(touchEnd);
  }
});
