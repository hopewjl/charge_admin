function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bluetoothstate: "未连接",
    name: '',
    bluetoothid: '',
    deviceId: '',
    deviceName: "LMCDQ",
    services: [],
    serviceId: "",
    notifyCharacteristicsId: "",
    connectedDeviceId: "",
    notifyServicweId: "",
    balanceData: "",
    hexstr: null,
    hexdata: [],
    sendhex: [0xdb, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x65],
    writeDatas: "",
    voltagesetnow: '', //
    voltagein: '',
    voltageout: '',
    single_voltage: '',
    maxcurrent: '',
    currentset: '',
    currentnow: '',
    temperature_diode: '',
    temperature_Ambient: '',
    charger_voltage_value: '',
    batterytype: '',
    battery_series: '',
    temperature_comp: '',
    current_dec_value: '',
    current_dec_timeset: '',
    soft_ver: '',
    hard_ver: '',
    charger_time: '',
    charger_time_now: '',
    power_time: '',
    coulomb: '',
    watthour: '',
    time_yc: '',
    time_kc: '',
    time_bc: '',
    time_wh: '',
    voltageset_bc: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    var that = this
    this.openbluetooth()
    this.startInter()
  },
  startInter: function () {
    var that = this
    setInterval(function () {
      if (that.data.bluetoothstate === "已连接到充电器") {
        that.sendData(that.buf2string(that.data.sendhex))
        //循环执行代码
      }
    }, 1000) //循环时间 这里是1秒
  },
  ProcessingReceivedData: function (data) {
    var receiveData = new Uint8Array(data)
    var that = this
    switch (receiveData[0]) {
      case 0xea:
        that.setData({
          voltagesetnow: (receiveData[1] * 256 + receiveData[2]) / 100,
          voltagein: (receiveData[3] * 256 + receiveData[4]) / 10,
          voltageout: (receiveData[5] * 256 + receiveData[6]) / 10,
          single_voltage: (receiveData[7] * 256 + receiveData[8]) / 100,
        })
        break
      case 0xeb:
        that.setData({
          maxcurrent: (receiveData[1] * 256 + receiveData[2]) / 100,
          currentset: (receiveData[3] * 256 + receiveData[4]) / 100,
          currentnow: receiveData[5] / 10,
          temperature_diode: receiveData[6] - 31,
          temperature_Ambient: receiveData[7] - 31,
        })
        break
      case 0xec:
        that.setData({
          charger_voltage_value: receiveData[1] * 2,
          batterytype: receiveData[2],
          battery_series: receiveData[3],
          temperature_comp: receiveData[4] / 10,
          current_dec_value: receiveData[5],
          current_dec_timeset: receiveData[6],
          soft_ver: receiveData[7] / 10,
          hard_ver: receiveData[8] / 10
        })
        break
      case 0xed:
        that.setData({
          charger_time: (receiveData[1] * 256 + receiveData[2]) / 10,
          charger_time_now: (receiveData[3] * 0xffff + receiveData[4] * 0xff + receiveData[5]) / 10,
          power_time: (receiveData[6] * 0xffff + receiveData[7] * 0xff + receiveData[8]) / 10,
        })
        break
      case 0xee:
        that.setData({
          coulomb: (receiveData[1] * 256 + receiveData[2]) / 100,
          watthour: (receiveData[3] * 0xffff + receiveData[4] * 0xff + receiveData[5]) / 100,
        })
        break
      case 0xef:
        that.setData({
          time_yc: receiveData[1],
          time_kc: receiveData[2]/10,
          time_bc: receiveData[3]/10,
          time_wh: receiveData[4],
          voltageset_bc: (receiveData[5] * 256 + receiveData[6]) / 100
        })
        break
      default:
        break

    }
  },




  notifyBLECharacteristicValueChange: function () {
    var that = this;
    console.log('6. 启用低功耗蓝牙设备特征值变化时的 notify 功能')
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.notifyCharacteristicsId,
      complete(res) {
        /* 用来监听手机蓝牙设备的数据变化 */
        console.log("正在监听蓝牙串口数据");
        that.setData({
          bluetoothstate: "已连接到充电器"
        })
        wx.onBLECharacteristicValueChange(function (res) {
          /**/
          that.data.hexdata = new Uint8Array(res.value)
          that.setData({
            hexstr: that.ab2hex(res.value)
          })
          /*that.setdata.hexstr = that.ab2hex(res.value)*/
          that.ProcessingReceivedData(res.value)
          console.log("得到串口数据如下");
          console.log(that.data.hexstr);
          that.data.balanceData = (that.data.hexdata[0] * 256 + that.data.hexdata[1]) / 10
         })
      },
      fail(res) {
        console.log(res, '启用低功耗蓝牙设备监听失败')
        //that.measuringTip(res)
      }
    })
  },

  /* 转换成需要的格式 */
  buf2string(buffer) {
    var arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    return arr.map((char, i) => {
      return String.fromCharCode(char);
    }).join('');
  },
  receiveData(buf) {
    return this.hexCharCodeToStr(this.ab2hex(buf))
  },
  /* 转成二进制 */
  ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('')
  },

  /* 转成可展会的文字 */
  hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join('');
  },
  getBLEDeviceCharacteristics: function () {
    /*获取蓝牙设备某个服务中所有特征值 */
    var that = this;
    setTimeout(() => {
      wx.getBLEDeviceCharacteristics({
        deviceId: that.data.deviceId,
        /* 前面得到的设备ID */
        serviceId: that.data.serviceId,
        /*前面得到的服务ID */
        success: function (res) {
          console.log('取得蓝牙数据传输服务ID');
          console.log(res);
          for (var i = 0; i < res.characteristics.length; i++) {
            if (res.characteristics[i].properties.notify) {
              console.log(res.characteristics[i].uuid, '蓝牙特征值 ==========')
              /* 获取蓝牙特征值 */
              that.data.notifyCharacteristicsId = res.characteristics[i].uuid
              // 启用低功耗蓝牙设备特征值变化时的 notify 功能
              that.notifyBLECharacteristicValueChange()
            }
          }
        },
        fail: function (res) {

        }
      })
    }, 1000)
  },
  getBLEDeviceServices: function () {
    var that = this;
    setTimeout(() => {
      wx.getBLEDeviceServices({
        deviceId: that.data.deviceId,
        success: function (res) {
          that.data.services = res.services
          for (var t = 0; t < that.data.services.length; t++) {
            var service = that.data.services[t]
            var serviceId = service.uuid.substring(4, 8)
            console.log(service);
            if (serviceId === 'FFE0') { //‘FFE0’为设备定义的读写UUID
              that.data.serviceId = service.uuid
            }
            console.log(res.services)
            /* 获取连接设备的所有特征值 */
            that.getBLEDeviceCharacteristics()
          }
        },
        fail: (res) => {
          console.log('未取得蓝牙服务特征值');
          console.log("蓝牙设备ID=:" + that.data.deviceId);
          console.log(res);

        }
      })
    }, 2000)
  },

  startBluetoothDevicesDiscovery: function () { //
    var that = this;
    setTimeout(() => {
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          / 获取蓝牙设备列表 /
          that.getBluetoothDevices()
          console.log(res);
        },
        fail(res) {}
      })
    }, 1000)
  },
  connectTO() {
    var that = this;
    wx.createBLEConnection({
      deviceId: this.data.deviceId,
      success: function (res) {
        / 4. 获取连接设备的 service 服务 /
        that.getBLEDeviceServices();
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log('已连接到LMCDQ 停止搜索')
          },
          fail(res) {

          }
        })
      },
      fail: function (res) {

      }
    })
  },
  getBluetoothDevices: function () {
    var that = this;
    var a = "11";
    setTimeout(() => {
      wx.getBluetoothDevices({
        services: [],
        allowDuplicatesKey: false,
        interval: 0,
        success: function (res) {
          a = JSON.stringify(res.devices);
          console.log("蓝牙服务个数： " + res.devices.length);
          if (res.devices.length > 0) {
            if (a.indexOf(that.data.deviceName) !== -1) {
              console.log("发现充电器");
              for (let i = 0; i < res.devices.length; i++) {
                if (that.data.deviceName === res.devices[i].name) {
                  / 根据指定的蓝牙设备名称匹配到 deviceId /
                  that.data.deviceId = res.devices[i].deviceId;
                  setTimeout(() => {
                    that.connectTO();
                  }, 2000);
                };
              };
            } else {
              console.log("未发现充电器");

            }
          } else {

          }
        },
        fail(res) {
          console.log(res, '获取蓝牙设备列表失败 =====')
        }
      })
    }, 2000)
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
  getBluetoothAdapterState: function () {
    var that = this;
    that.toastTitle = '检查蓝牙状态'
    wx.getBluetoothAdapterState({
      success: function (res) {
        that.startBluetoothDevicesDiscovery()
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  openbluetooth: function () {
    var that = this;
    that.setData({
      bluetoothstate: "正在搜索充电器"
    })
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter({
        success: function (res) {
          / 获取本机的蓝牙状态 /
          setTimeout(() => {
            that.getBluetoothAdapterState()
          }, 1000)
        },
        fail: function (err) {
          // 初始化失败	
        }
      })
    } else {}
    this.startBluetoothDevicesDiscovery()
    console.log('打开蓝牙适配器成功');
  },
  sendData: function (str) {
    let that = this;
    let dataBuffer = new ArrayBuffer(str.length)
    let dataView = new DataView(dataBuffer)
    for (var i = 0; i < str.length; i++) {
      dataView.setUint8(i, str.charAt(i).charCodeAt())
    }
    let dataHex = that.ab2hex(dataBuffer);
    that.data.writeDatas = that.hexCharCodeToStr(dataHex);
    wx.writeBLECharacteristicValue({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.notifyCharacteristicsId,
      value: dataBuffer,
      success: function (res) {
        console.log('发送的数据：' + that.data.writeDatas)
        console.log('message发送成功')
      },
      fail: function (res) {
        console.log('发送的数据失败：' + that.data.writeDatas)
        console.log(res);
      },
      complete: function (res) {}
    })
  }
})