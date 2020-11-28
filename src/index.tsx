import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge from '@vkontakte/vk-bridge';

import { OpenAPI } from './api/core/OpenAPI';

OpenAPI.BASE = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5001';

// Sends event to client
bridge.send('VKWebAppInit');
 
// Subscribes to event, sended by client
bridge.subscribe(e => console.log(e));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
