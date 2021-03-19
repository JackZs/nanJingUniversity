
//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerImgList: [],
    categoryList:[],
    activityList:[],
    newsList:[],
    baseUrl:"https://wx.yogalt.com/",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    list:[],
    page:1,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addCart(data) {
    let item = data.currentTarget.dataset.item
    app.http('v1/order/addCart', {
      id: item._id,
      num: 1,
      spec: ['asdasasd'],
      title: item.title,
      img: item.img,
      price: item.price
    }, "POST")
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '已加入购物车',
            icon: 'success',
            duration: 500
          })
        }
      })
  },
  imgsc:function(e){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://wx.yogalt.com/api/v1/admin/uploadBanner',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'inputFile',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          formData: {
            href:'www.baidu.com',           //跳转地址
            name:'大蛋糕',           //名称
            is_hide:true,       //是否显示
            effective:'2018-09-14,2019-09-14',       //有效期
          },
          success: function (res) {
            var data = res.data;
            console.log('data');
          },
          fail: function (res) {
            console.log('fail');

          },
        })
      }
    })
  },
  getBannerList(){
    wx.request({
      url:'https://xyh.nju.edu.cn/uplus-system/app/v1/mobile/group/getMobileSettingGroupList',
      method:'GET',
      data:{
      groupType:1
      },
      success:(res)=>{
        this.setData({
          bannerImgList: res.data.data
        })

      }
    })
  },
  getCategoryList(){
    wx.request({
      url:'https://xyh.nju.edu.cn/uplus-system/app/v1/mobile/group/getMobileSettingGroupList',
      method:'GET',
      data:{
      groupType:2
      },
      success:(res)=>{
        this.setData({
          categoryList: res.data.data
        })
      }
    })
  },
  getNewsList(){
    wx.request({
      url:'https://xyh.nju.edu.cn/uplus-operateu/api/v1/web/mobile/index/article/list',
      method:'GET',
      data:{
        offset: 0,
        limit: 3,
        websiteId: 1,
        isRecommend: 1,
        orderBy: 'order by wai.publish_date DESC'
      },
      success:(res)=>{
        this.setData({
          newsList: res.data.data.rows
        })
      }
    })
  },
  getActivityList(){
    wx.request({
      url:'https://xyh.nju.edu.cn/uplus-operateu/app/v1/activity/getActivityPage',
      method:'GET',
      data:{},
      success:(res)=>{
        this.setData({
          activityList: res.data.data.rows.splice(0,3)
        })
      }
    })
  },
  lower:function(e){
    console.log(e)
  },
  getList: function(){
    app.http('v1/home/getHotList', { page: this.data.page})
      .then(res => {
        if (res.code == 200 && res.data.list.length > 0) {
          this.data.page++
          let list = this.data.list
          for (let i = 0; i < res.data.list.length; i++) {
            list.push(res.data.list[i])
          }
          this.setData({
            list: list,
            page: this.data.page
          })
          console.log(this.data)
        }
      })
  },
  onLoad: function () {
    let app = getApp()
    this.getBannerList()
    this.getCategoryList()
    this.getNewsList()
    this.getActivityList()
     if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
       })
     }

    // app.http('v1/home/bannerList')
    // .then(res=>{
    //   this.setData({
    //     imgUrls: res.data
    //   })
    // })
    // app.http('v1/admin/addCoupon',{
    //   name:'节日蛋糕满200减50',
    //   money:50,
    //   effective: ['2018-09-10', '2018-09-10'],
    //   category:'5b8f45f2afb7c17788e11994',
    //   category_name:'节日',
    //   condition: 200
    // },"POST")
    //   .then(res => {
    //    console.log(res)
    //   })
    
    // wx.request({
    //   url: 'https://wx.yogalt.com/api/v1/admin/getClassList',
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })

    // wx.request({
    //   url: 'https://wx.yogalt.com/api/v1/admin/addClass',
    //   method: 'POST',
    //   data: {
    //     cate_name: 'party',
    //     cate_order: 4,
    //   },
    //   header: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })

    // wx.request({
    //   url: 'https://wx.yogalt.com/api/v1/admin/addItem',
    //   method:'POST',
    //   data:{
    //     title:"中秋节大蛋糕",
    //     img:"https://wx.yogalt.com/file/images/img1.jpeg",
    //     spec:"1221123",
    //     price:'990.2',
    //     num:999,
    //     content:'我是情人节大蛋糕',
    //     html: '哈哈哈哈或',
    //     category:"5b8f45f2afb7c17788e11994|节日",
    //     is_hot:true
    //   },
    //   header:{
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
