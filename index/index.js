const app = getApp()

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
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
  data: {
    devices: [],
    lastConnectedDeviceId:"",
    connected: false,
    name:"",
    chs: [],
    cmd:{
      ctl_vol: [0xdb, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x65]
    },
    real_data:{ 
       
      balanceData: "",
      hexstr: null,
      hexdata: [],
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
    myColors: [{
      percent: 50,
      color: '#67C23A'
  }, {
      percent: 80,
      color: '#E6A23C'
  }, {
      percent: 100,
      color: '#F56C6C'
  }]
  },
  onLoad: function(options) {
     this.openBluetoothAdapter()
  },
  startWatcher: function(){
    var self = this
    let handler=setInterval(function () {
     if (!self.data.connected){
      clearInterval(handler );
     }
     self.writeBLECharacteristicValue(self.data.cmd.ctl_vol)
    }, 1000)  
  },

  ProcessingReceivedData: function (data) {
    var receiveData = new Uint8Array(data)
    var that = this
    switch (receiveData[0]) {
      case 0xea:
        that.setData({real_data:{
          voltagesetnow: (receiveData[1] * 256 + receiveData[2]) / 100,
          voltagein: (receiveData[3] * 256 + receiveData[4]) / 10,
          voltageout: (receiveData[5] * 256 + receiveData[6]) / 10,
          single_voltage: (receiveData[7] * 256 + receiveData[8]) / 100,
        }})
        break
      case 0xeb:
        that.setData({real_data:{
          maxcurrent: (receiveData[1] * 256 + receiveData[2]) / 100,
          currentset: (receiveData[3] * 256 + receiveData[4]) / 100,
          currentnow: receiveData[5] / 10,
          temperature_diode: receiveData[6] - 31,
          temperature_Ambient: receiveData[7] - 31,
        }})
        break
      case 0xec:
        that.setData({real_data:{
          charger_voltage_value: receiveData[1] * 2,
          batterytype: receiveData[2],
          battery_series: receiveData[3],
          temperature_comp: receiveData[4] / 10,
          current_dec_value: receiveData[5],
          current_dec_timeset: receiveData[6],
          soft_ver: receiveData[7] / 10,
          hard_ver: receiveData[8] / 10
        }})
        break
      case 0xed:
        that.setData({real_data:{
          charger_time: (receiveData[1] * 256 + receiveData[2]) / 10,
          charger_time_now: (receiveData[3] * 0xffff + receiveData[4] * 0xff + receiveData[5]) / 10,
          power_time: (receiveData[6] * 0xffff + receiveData[7] * 0xff + receiveData[8]) / 10,
        }})
        break
      case 0xee:
        that.setData({real_data:{
          coulomb: (receiveData[1] * 256 + receiveData[2]) / 100,
          watthour: (receiveData[3] * 0xffff + receiveData[4] * 0xff + receiveData[5]) / 100,
        }})
        break
      case 0xef:
        that.setData({real_data:{
          time_yc: receiveData[1],
          time_kc: receiveData[2]/10,
          time_bc: receiveData[3]/10,
          time_wh: receiveData[4],
          voltageset_bc: (receiveData[5] * 256 + receiveData[6]) / 100
        }})
        break
      default:
        break

    }
  },

  openBluetoothAdapter() {
    this._discoveryStarted = false
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery()
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        if (device.deviceId == this.data.lastConnectedDeviceId) {
          this.createBLEConnection(device)
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data)
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget?e.currentTarget.dataset:e
    const deviceId = ds.deviceId
    const name = ds.name
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
          lastConnectedDeviceId:deviceId
        })
        this.getBLEDeviceServices(deviceId)
        this.startWatcher()
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
           }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    //监听状态
    wx.onBLEConnectionStateChange((res)=> {
      // 该方法回调中可以用于处理连接意外断开等异常情况
      console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
      this.setData({
        connected:res.connected,
      })
      this.openBluetoothAdapter()
        wx.showToast({
          title: '链接断开',
          icon: 'error',
          duration: 10000
        })

    })    
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      console.log("wx.onBLECharacteristicValueChange 监听事件：\n"+JSON.stringify(characteristic));
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      //this.setData(data)
      this.ProcessingReceivedData(characteristic.value)
    })
  },
  writeBLECharacteristicValue(data) {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(10)
    let dataView = new DataView(buffer)
    for (var i = 0; i < data.length; i++) {
      dataView.setUint8(i, data[i])
    }

    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
      success (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },
})
