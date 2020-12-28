import React from 'react';
import {Alert} from 'react-native';
import Webview from 'react-native-webview';

// ! 暗号：技术为生活服务
const uri = 'https://m.mtime.cn/#!/onlineticket/641957474/';

// 注入webview中的代码
const INJECT_JS = (window, document) => {
  let submitButton;

  function waitForBtnRender() {
    submitButton = document.getElementById('submitBtn');
    if (!submitButton) {
      // 循环判断页面座位是否加载完成
      setTimeout(waitForBtnRender, 2000);
    } else {
      submitButton.onclick = () => {
        const seat = [];
        document.querySelectorAll('.seat_selected').forEach((node) => {
          seat.push(node.getAttribute('name'));
        });
        window.ReactNativeWebView.postMessage(seat.join(','));
      };
    }
  }
  waitForBtnRender();
};

// 电影选座案例
export default function SeatSelectScreen() {
  return (
    <Webview
      source={{uri}}
      injectedJavaScript={`(${INJECT_JS.toString()})(window,document)`}
      onMessage={(e) => {
        Alert.alert(`您选中的座位是：${e.nativeEvent.data}`);
      }}
    />
  );
}
