// // recommend.js
// import { URLS } from "../../config.js";
// var app = getApp()
Page({
  data: {
    userInfo: {},
    userModel: {},
    provinces: [],
    userName: '',
    mobile: '',
    selectedProvince: {},
    provinceIndex: '',
    buildingIndex: '',
    buildPickerDisabled: true,
    buildPickerDefault: '请先选择所在省份',
    submitDisabied: false

  },
  navigate: function () {
    wx.navigateTo({
      url: '../registration/registration?source=0&userModel=' + JSON.stringify(this.data.userModel),
    })
  },

  // fetchBuildingList: function () {
  //   var that = this;
  //   wx.request({
  //     url: URLS.GET_BUILDING_LIST,
  //     data: {
  //     },
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       that.setData({
  //         provinces: res.data.obj.buildingList
  //       })
  //     },
  //     fail: function (err) {
  //       console.log(err)
  //     }
  //   })
  // },

  showToast: function (title) {
    if (!title) {
      return
    }
    this.wetoast.toast({
      title: title,
      position: 'bottom',
    })
  },

  requestRecommend: function () {
    if (this.data.userName === '') {
      this.showToast('请填写客户姓名');
      return
    } else if (this.data.mobile === '') {
      this.showToast('请填写手机号码');
      return
    } else if (!this.isTelephone(this.data.mobile)) {
      this.showToast('手机号码不正确');
      return
    } else if (this.data.provinceIndex === '') {
      this.showToast('请选择所属省份');
      return
    } else if (this.data.buildingIndex === '') {
      this.showToast('请选择所在楼盘');
      return
    }
    var that = this;
    this.setData({
      submitDisabied: true
    })
    wx.request({
      url: URLS.RECOMMEND,
      data: {
        "accessToken": this.data.userModel.accessToken,
        "agentMobile": this.data.userModel.mobile,
        "customerName": this.data.userName,
        "customerMobile": this.data.mobile,
        "buildingId": this.data.selectedProvince.buildingInfos[this.data.buildingIndex].buildingId,
        "zoneId":this.data.selectedProvince.buildingInfos[this.data.buildingIndex].zoneId,
        "source": 0
      },
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          submitDisabied: false
        })
        if (res.data.code === 1) {
          wx.redirectTo({
            url: '../commitSuccess/commitSuccess?tips=' + res.data.ext.msg,
          })
        } else {
          wx.navigateTo({
            url: '../commitFailed/CommitFailed?tips=' + res.data.ext.msg,
          })
        }
      },
      fail: function (err) {
        that.showToast("网络错误，提交失败")
        that.setData({
          submitDisabied: false
        })
      }
    })
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据

    var userModel = wx.getStorageSync('userModel')
    this.setData({
      userModel: userModel
    })
    // console.log(userModel,'wx.getStorageSync')
    // this.fetchBuildingList();
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
     
    //   that.setData({
    //     userInfo: userInfo
    //   })
      
    // })
    // new app.WeToast()
    // console.log(this.data.userInfo,'userInfo')
  },

  bindProChange: function (e) {
    this.setData({
      provinceIndex: e.detail.value,
      selectedProvince: this.data.provinces[e.detail.value],
      buildPickerDisabled: false,
      buildPickerDefault: ''
    })
  },

  bindBuildChange: function (e) {
    this.setData({
      buildingIndex: e.detail.value,
    });
  },

  inputName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  inputMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  isTelephone: function (mobile)// 正则判断 以1开头,后面10位全为数字 
  {
    var pattern = /^[0-9]*$/;
    return pattern.test(mobile);
  },


  lalala: function (e) {
    console.log("hhhhhh",e)
   wx.navigateTo({
     url:"../search/search"
   })
  },



})
