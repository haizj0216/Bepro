// pages/analysis/analysis.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    borderColor:"#FFB6C1",
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
      data: [
      {
        value: [80, 74, 56, 90, 61, 10, 78, 43],
        name: '皮肤'
      }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
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
    faceanalysis: {},
    analysisresult: "作为资深的夜行动物，生活已经对你痛下狠手啦。皮肤急救刻不容缓，但是病急也不能乱投医，猛药背后肯定要付出代价的，EWG级别原料产品，特别适合现在的你，对自己好一点，才是最正经的罗曼史",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
    })
    console.log(faceanalysis);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})