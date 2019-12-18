// pages/analysis/analysis.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [],
    ec: {
      lazyLoad: true,
    },

    faceresult: [
      [{
        icon: "/images/icon_skin_maokong.png",
        name: "毛孔",
        score: "1",
      }, {
        icon: "/images/icon_skin_heitou.png",
        name: "黑头",
        score: "0",
      }],
      [{
        icon: "/images/icon_skin_eye.png",
        name: "细纹",
        score: "1",
      }, {
        icon: "/images/icon_skin_doudou.png",
        name: "痘痘",
        score: "0",
      }],
      [{
        icon: "/images/icon_skin_seban.png",
        name: "色斑",
        score: "2",
      }, {
        icon: "/images/icon_skin_fanhong.png",
        name: "泛红",
        score: "",
      }],
      [{
        icon: "/images/icon_skin_yanquan.png",
        name: "黑眼圈",
        score: "2",
      }, {
        icon: "/images/icon_skin_falingwen.png",
        name: "法令纹",
        score: "1",
      }]
    ],
    echartsComponnet: null,
    faceanalysis: app.globalData.analysis,
    analysisresult: "作为资深的夜行动物，生活已经对你痛下狠手啦。皮肤急救刻不容缓，但是病急也不能乱投医，猛药背后肯定要付出代价的，EWG级别原料产品，特别适合现在的你，对自己好一点，才是最正经的罗曼史",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart-dom-graph');

    this.updateAnalysis()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });

        var option = {
          backgroundColor: "#ffffff",
          color: ["#37A2DA", "#FF9F7F"],
          borderColor: "#FFB6C1",
          tooltip: {},
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          radar: {
            // shape: 'circle',
            indicator: [{
                name: '毛孔',
                max: 100
              },
              {
                name: '黑头',
                max: 100
              },
              {
                name: '细纹',
                max: 100
              },
              {
                name: '痘痘',
                max: 100
              },
              {
                name: '色斑',
                max: 100
              },
              {
                name: '泛红',
                max: 100
              },
              {
                name: '黑眼圈',
                max: 100
              },
              {
                name: '法令纹',
                max: 100
              }
            ]
          },
          series: [{
            name: '皮肤',
            type: 'radar',
            data: [{
              value: this.data.scores,
              name: '皮肤'
            }]
          }]
        };

        chart.setOption(option);
        return chart;
      }

    )
  },


  updateAnalysis() {
    var result = app.globalData.analysis;
    if (result == null) {
      let score = [80, 58, 82, 36, 75, 57, 60, 46];
      console.log(score);
      this.setData({
        scores: score
      })
    } else {
      let maokong = result.pores_left_cheek.confidence * 100;
      let falingwen = result.nasolabial_fold.confidence * 100;
      let heiyanquan = result.dark_circle.confidence * 100;
      let yandai = result.eye_pouch.confidence * 100;
      let seban = result.skin_spot.confidence * 100;
      let doudou = result.acne.confidence * 100;
      let xiwen = result.eye_finelines.confidence * 100;
      let blackhead = result.blackhead.confidence * 100;
      let score = [maokong, blackhead, xiwen, doudou, seban, yandai, heiyanquan, falingwen];
      console.log(score);
      this.setData({
        scores: score
      })
    }
    this.init_echarts();
  },

  toRemommend:function() {
    wx.navigateTo({
      url:"/pages/recommend/recommend"
    })
  }


})