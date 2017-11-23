<template>
  <div class="wrap">
    <p style="text-align:center;margin: 50px 0;">菱形地图</p>
    <div :id="viewId" :style='containerStyle'>      
    </div>
    参考链接：
    <ul>
      <li v-for="(link,index) in links">
        <router-link :to="link">{{(index+1)}}、{{link}}</router-link>
      </li>
    </ul>    
  </div>
</template>

<script>
import {
  Application,
  Container,
  Texture,
  Sprite,
  Rectangle
} from "pixi.js";

export default {
  name: "index",
  data() {
    return {
      viewId: 'diamondView',
      mapBounds: {
        w: 108,
        h: 36
      },
      stageBounds: {
        w: 800,
        h: 600
      },
      containerStyle:{
        width: '800px',
        height: '600px',
        margin: '0 auto',
        background: '#FF000000'
      },
      particleContainer: null,
      pixiApp: null,
      container: null,
      links:[
        'http://www.cppblog.com/wc250en007/archive/2012/07/20/184285.html',
        'http://blog.csdn.net/ybhjx/article/details/50522825'
      ]
    };
  },
  mounted(){
    let stageBounds = this.stageBounds;
    this.container = document.getElementById(this.viewId);
    this.containerStyle.width = stageBounds.w + 'px';
    this.containerStyle.height = stageBounds.h + 'px';

    if (window.$app) {
      window.$app.stop();
      window.$app.destroy(true);
      window.$app = this.pixiApp = null;
    }

    let app = null,stage = null;
    app = this.pixiApp = window.$app = new Application(
      stageBounds.w,
      stageBounds.h,
      {
        backgroundColor: 0xffffff
      }
    );
    stage = app.stage;
    stage.hitArea = new Rectangle(0, 0, stageBounds.w, stageBounds.h);
    stage.interactive = true;
    this.container.appendChild(app.view);

    var mapContainer = new Container();    
    var texture = Texture.fromImage(require("@/assets/img/simple.png"));
    var bounds = this.mapBounds;
    let rowCount = 4,columnCount = 6;
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < columnCount; c++) {
        var bunny = new Sprite(texture);
        bunny.width = bounds.w;
        bunny.height = bounds.h;

        bunny.x = c * bounds.w / 2 - r * bounds.w / 2;
        bunny.y = c * bounds.h - c * bounds.h / 2 + r * bounds.h / 2;
        mapContainer.addChild(bunny);
      }
    }
    mapContainer.x = bounds.w+bounds.w/2;
    stage.addChild(mapContainer);
  }
}
</script>
<style lang='scss' scoped>
.wrap{
  width: 1000px;
  margin: 0 auto;
}
li{
  list-style: none;
  line-height: 25px;
  a{
    text-decoration: none;
    color: #000;
  }
}
</style>
