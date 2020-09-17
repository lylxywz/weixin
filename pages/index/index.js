//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    realtime: {},
    today: {},
    tomorrow: {},
    ip:''
  },
  
  //事件处理函数
  onLoad: function () {
    
  this.IP();

    
  },
  //动态地址
  IP(){
   
 
    wx.request({
      url: 'http://ip-api.com/json?lang=zh-CN&fields=6025215',
      success: (res)=>{
   
        //console.log(res.data.city);
       this.setData({
          ip:res.data.city
        }) 
        var self = this
        var ip=res.data.city
        //除去市或省
        ip=ip.substring(0,ip.length - 1)
       // console.log(ip)

    wx.request({
      url: 'http://apis.juhe.cn/simpleWeather/query?city='+ip+'&key=6f8d39f01dc5317eed866808dcd4f2fb',
      success(res){
        //console.log(res)
        // 判断空气质量
        var aqi = res.data.result.realtime.aqi;
        if (aqi > 250) {
          var airRate = "严重污染";
          var airColor = "purple";
        } else if (aqi > 100) {
          var airRate = "污染";
          var airColor = "red";
        } else if (aqi > 50) {
          var airRate = "良";
          var airColor = "yellow";
        } else {
          var airRate = "优";
          var airColor = "green";
        }
        res.data.result.realtime.airRate = airRate;
        res.data.result.realtime.airColor = airColor;
        
        // 判断天气图标
        res.data.result.future[0].icon = res.data.result.future[0].weather.split("转")[0]
        res.data.result.future[1].icon = res.data.result.future[1].weather.split("转")[0]

        // 设置天气数据
        self.setData({
          realtime: res.data.result.realtime,
          today: res.data.result.future[0],
          tomorrow: res.data.result.future[1],
        })
      }
    })
    }
  
    })
 
  },
  onShow: function () {
  console.log(this.data.ip)
  },
})
