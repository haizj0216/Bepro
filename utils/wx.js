var e = require("../@babel/runtime/helpers/interopRequireDefault")(require("../@babel/runtime/regenerator"));

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.regeneratorRuntime = exports.default = void 0;

var t = n(require("./lib/runtime")), r = function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
    var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
    a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
  }
  return t.default = e, t;
}(require("./lib/promisify")), a = n(require("./request"));

function n(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var o = (0, r.default)(wx, {
  objectParams: !0,
  exclude: [/^on/, /^off/, /Sync$/, /^.+TabBar$/, /^requestPayment$/, new RegExp("closeSocket\nstopRecord\ngetRecorderManager\npauseVoice\nstopVoice\npauseBackgroundAudio\nstopBackgroundAudio\ngetBackgroundAudioManager\ncreateAudioContext\ncreateInnerAudioContext\ncreateVideoContext\ncreateMapContext\ncanIUse\nhideToast\nhideLoading\nshowNavigationBarLoading\nhideNavigationBarLoading\nnavigateBack\ncreateAnimation\npageScrollTo\ncreateSelectorQuery\ncreateCanvasContext\ncreateContext\ndrawCanvas\nstopPullDownRefresh\ncreateSelectorQuery\ngetExtConfigSync\ncreateCameraContext\ncreateLivePlayerContext\ncreateLivePusherContext".split(/\r\n|\r|\n/).join("|"), "gi"), new RegExp("createImage\nloadFont\nsetPreferredFramesPerSecond\ngetFileSystemManager".split(/\r\n|\r|\n/).join("|"), "gi")]
});

wx.createCameraContext && (o.createCameraContext = (0, r.promisifyReturns)(wx.createCameraContext.bind(wx), {
  takePhoto: {
    objectParams: !0
  },
  startRecord: {
    objectParams: !0
  },
  stopRecord: {
    objectParams: !0
  }
})), wx.createLivePlayerContext && (o.createLivePlayerContext = (0, r.promisifyReturns)(wx.createLivePlayerContext.bind(wx), {
  play: {
    objectParams: !0
  },
  stop: {
    objectParams: !0
  },
  mute: {
    objectParams: !0
  },
  requestFullScreen: {
    objectParams: !0
  },
  exitFullScreen: {
    objectParams: !0
  }
})), wx.createLivePusherContext && (o.createLivePusherContext = (0, r.promisifyReturns)(wx.createLivePusherContext.bind(wx), {
  play: {
    objectParams: !0
  },
  stop: {
    objectParams: !0
  },
  mute: {
    objectParams: !0
  },
  requestFullScreen: {
    objectParams: !0
  },
  exitFullScreen: {
    objectParams: !0
  }
})), wx.getFileSystemManager && (o.getFileSystemManager = (0, r.promisifyReturns)(wx.getFileSystemManager.bind(wx), {
  access: {
    objectParams: !0
  },
  copyFile: {
    objectParams: !0
  },
  getFileInfo: {
    objectParams: !0
  },
  mkdir: {
    objectParams: !0
  },
  rmdir: {
    objectParams: !0
  },
  rename: {
    objectParams: !0
  },
  readFile: {
    objectParams: !0
  },
  readdir: {
    objectParams: !0
  },
  saveFile: {
    objectParams: !0
  },
  stat: {
    objectParams: !0
  },
  writeFile: {
    objectParams: !0
  },
  unlink: {
    objectParams: !0
  }
})), wx.canvasToTempFilePath && (o.canvasToTempFilePath = (0, r.promisifyReturns)(wx.canvasToTempFilePath.bind(wx), {})),
  o.request = a.default.request, o.uploadFile = a.default.uploadFile;

var i = o;

exports.default = i;

t.default;

exports.regeneratorRuntime = e.default;