var itemsLayer;
var cat;
var basket;
var xSpeed = 0; //カートの移動速度
var time = 60; //制限時間
var score = 0; //リンゴの数


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

    //timeの表示
    timeText = cc.LabelTTF.create("残り時間:"+time,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(timeText);
    timeText.setPosition(50,300);

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
    topLayer.addChild(cat, 1);

    this.schedule(this.addItem, 1);

    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);

    //playerの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();
  },
  addItem: function() {
    var item = new Item();
    itemsLayer.addChild(item, 1);
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {
    if (touching) {
    //touchEnd(ドラックしている位置）とタッチ開始位置の差を計算する
    //そのままだと値が大きすぎるので50で割る
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
      topLayer.setPosition(topLayer.getPosition().x + xSpeed, topLayer.getPosition().y);
    }
  }

});
function timer(){

  this.addChild(timeText);
}
var Item = cc.Sprite.extend({
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
    var moveAction = cc.MoveTo.create(4, new cc.Point(Math.random() * 400 + 40, -110));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //果物の処理　座標をチェックしてカートの接近したら
    if (this.getPosition().y < 35 && this.getPosition().y > 30 &&
      Math.abs(this.getPosition().x - cat.getPosition().x) < 10 && !this.isbug) {
      gameLayer.removeItem(this);
      console.log("FRUIT");
    }
    //爆弾の処理　座標をチェックしてカートの接近したら　フルーツより爆弾に当たりやすくしている
    if (this.getPosition().y < 35 && Math.abs(this.getPosition().x - cat.getPosition().x) < 25 &&
      this.isbug) {
      gameLayer.removeItem(this);
      console.log("bug");
    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -100) {

      gameLayer.removeItem(this)
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
