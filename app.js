//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  bt:{
    connected:false
  },
  //0=铅酸电池 1=磷酸铁锂 2=三元聚合物 4=自定义电池
  battery_type_descr:[
    "铅酸电池","磷酸铁锂","三元聚合物","自定义电池"
  ],
  charge_info:{ 
    balanceData: "",
    hexstr: null,
    hexdata: [],
    writeDatas: "",
    voltagesetnow: 0, // 
    voltagein: 0,
    voltageout: 0,
    single_voltage: 0,
    maxcurrent: 0,
    currentset: 0,
    currentnow: 3,
    temperature_diode: 0,
    temperature_Ambient: 0,
    charger_voltage_value: 0,
    batterytype: '铅酸',
    battery_series: 10,
    temperature_comp: 1,
    circuit_comp:50,
    current_dec_value: 0,
    current_dec_timeset: 0,
    soft_ver: 0,
    hard_ver: 0,
    charger_time: '',
    charger_time_now: 0,
    power_time: '',
    coulomb: 0.0,
    watthour: 0.0,
    time_yc: 100,
    time_kc: 0,
    time_bc: 0,
    time_wh: 0,
    voltageset_bc: 0,
    version_hdw: '1.0',
    version_sw: '1.0',
    charger_power:200,
  }
})