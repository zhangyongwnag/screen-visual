import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './asset/css/Index.css'

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// 热模块更新
if (module.hot) {
  module.hot.accept()
}
