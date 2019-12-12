// pages/sleep/sleep.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio1: '1',
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },

  toresult:function(){
    wx.navigateTo({
      url: '/pages/analysis/analysis',
    })
  }
})