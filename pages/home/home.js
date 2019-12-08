// pages/home/home.js
Page({
  data: {
    scrollindex: 0, //当前页面的索引值
    totalnum: 3, //总共页面数
    starty: 0, //开始的位置x
    endy: 0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop: 0, //滑动下拉距离
    animationData: {},
    image_1: "https://www.kiehls.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-kiehls-cn-Library/default/dw8024d4e1/images/HB/HBKLS20181119_2.jpg?sw=431&sh=2000&sm=fit",
    image_2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575788793957&di=f3b89a85603ec395cbf368eeb51e5af9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F75%2F45%2F69A58PICv2i_1024.jpg",
    image_3: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575788793957&di=f3b89a85603ec395cbf368eeb51e5af9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F75%2F45%2F69A58PICv2i_1024.jpg",

    image_person: [{
      name: "性别",
      img: "../../images/keyboard_0_new.png",
    }, {
      name: "年龄",
      img: "../../images/keyboard_1_new.png",
    }, {
      name: "皮肤类型",
      img: "../../images/keyboard_2_new.png",
    }, {
      name: "干燥",
      img: "../../images/keyboard_3_new.png",
    }],

    image_environment: [{
      name: "湿度",
      img: "../../images/keyboard_4_new.png",
    }, {
      name: "温度",
      img: "../../images/keyboard_5_new.png",
    }, {
      name: "UV",
      img: "../../images/keyboard_6_new.png",
    }, {
      name: "空气质量",
      img: "../../images/keyboard_7_new.png",
    }],

    image_life_style: [{
      name: "护肤习惯",
      img: "../../images/keyboard_8_new.png",
    }, {
      name: "化妆频率",
      img: "../../images/keyboard_9_new.png",
    }, {
      name: "运动频率",
      img: "../../images/keyboard_10_new.png",
    }, {
      name: "压力水平",
      img: "../../images/keyboard_11_new.png",
    }],
  },

  onLoad: function() {
    wx.hideTabBar();
  },
  scrollTouchstart: function(e) {
    let py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },
  scrollTouchmove: function(e) {
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    if (py - d.starty < 100 && py - d.starty > -100) {
      this.setData({
        margintop: py - d.starty
      })
    }
  },
  scrollTouchend: function(e) {
    let d = this.data;
    if (d.endy != 0 && d.endy - d.starty > 100 && d.scrollindex > 0) {
      this.setData({
        scrollindex: d.scrollindex - 1
      })
    } else if (d.endy != 0 && d.endy - d.starty < -100 && d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1
      })
    }
    if(d.scrollindex == d.totalnum - 1) {
      wx.showTabBar();
    } else {
      wx.hideTabBar();
    }
    this.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
  },

  goNext: function() {
    debugger;
    let d = this.data;
    if (d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1,
        starty: 0,
        endy: 0,
        margintop: 0
      })
    }
    
  },

  toTest: function() {
    wx.navigateTo({
      url: '../test_baseinfo/test_1'
    })
  }


})