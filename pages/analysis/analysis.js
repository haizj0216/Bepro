// pages/analysis/analysis.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
var n = require("../../common/config.default");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [],
    ec: {
      lazyLoad: true,
    },

    city: '',
    age: '',
    sex: '',
    test_time: "",
    echartsComponnet: null,
    circleComponnet:null,
    analysis_result: {},
    analysis_string: "",
    ageRange: ['<20', '21~35', '36~45', '46~55', '>55'],
    totalScore:0,
    userName:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart-dom-graph');
    this.circleComponnet = this.selectComponent('#circle-wewle');
    this.getdata()
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
          label: {
            normal: {
              
              show:true,
              formatter:function(params) {
                return params.value;
              }
            }
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
            ],
          //   axisLabel: {
          //     show: true,
          //     fontSize: 12,
          //     color: '#838D9E',
          //     showMaxLabel: false, //不显示最大值，即外圈不显示数字30
          //     showMinLabel: false, //显示最小数字，即中心点显示0
          // },            

          },
          series: [{
            name: '皮肤',
            type: 'radar',
            data: [{
              value: this.data.scores,
              name: '皮肤'
            }],
            label: {
              normal: {
                fontSize: 20,
                rich: {},
              },
              
            }
          }]
        };

        chart.setOption(option);
        return chart;
      }

    )
  },

  getdata: function () {
    let that = this
    var token = wx.getStorageSync("token")
    wx.showLoading()
    wx.request({
      url: n.apiHost + n.apiUrl.testResult + "?token=" + token,
      method: "GET",
      success(res) {
        if (res.data.code == 99999) {
          var age = that.data.ageRange[res.data.data.age - 1]
          var sex = res.data.data.sex == 1 ? "女" : "男"
          var citys = res.data.data.city
          var city = citys.split(',')
          var result = JSON.parse(res.data.data.analysisResult)
          var date = new Date(res.data.data.testTime);
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          const day = date.getDate()
          var createTime = year + "-" + month + "-" + day
          that.setData({
            age: age,
            city: city[1],
            sex: sex,
            test_time: createTime,
            analysis_result: result,
            analysis_string: res.data.data.analysisString,
            userName:res.data.data.testName,
          })
          wx.setStorageSync('hasDoneQuestion', 1)
          wx.setStorageSync('testName', res.data.data.testName)
          that.updateanalysis(result)
        }
      },
      fail(res) {

      },
      complete(res) {
        wx.hideLoading()
      }
    })
  },

  updateanalysis: function (result) {

    if (result == null) {
      let score = [80, 58, 82, 36, 75, 57, 60, 46];
      console.log(score);
      this.setData({
        scores: score
      })
    } else {
      let maokong = result.pores_left_cheek.confidence * 100;
      let falingwen = 100- result.nasolabial_fold.confidence * 100;
      let heiyanquan = result.dark_circle.confidence * 100;
      let yandai = result.eye_pouch.confidence * 100;
      let seban = result.skin_spot.confidence * 100;
      let doudou = result.acne.confidence * 100;
      let xiwen = 100- result.eye_finelines.confidence * 100;
      let blackhead = 100- result.blackhead.confidence * 100;
      let score = [parseInt(maokong), parseInt(blackhead), parseInt(xiwen), parseInt(doudou), parseInt(seban), parseInt(yandai), parseInt(heiyanquan), parseInt(falingwen)];
      let finalScore = (parseInt(maokong)+parseInt(blackhead)+parseInt(xiwen)+ parseInt(doudou)+ parseInt(seban)+ parseInt(yandai)+ parseInt(heiyanquan)+ parseInt(falingwen)) / 8
      console.log(score);
      this.setData({
        scores: score,
        totalScore:parseInt(finalScore),
      })
    }
    this.init_echarts();
    this.circleComponnet.initCircle();
  },

  recompute(value) {

  },

  

  toRemommend: function () {
    wx.navigateTo({
      url: "/pages/recommend/recommend"
    })
  }


})