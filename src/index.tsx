import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge, { UpdateConfigData } from '@vkontakte/vk-bridge';

import { OpenAPI } from './api/core/OpenAPI';
import { FavoriteService } from './services/FavoritesService';

OpenAPI.BASE = process.env.REACT_APP_BACKEND_URL || 'https://localhost:5001';

// Sends event to client
bridge.send('VKWebAppInit');

// Subscribes to event, sended by client
bridge.subscribe(e => {
  console.log(e);
  if (e.detail.type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    const configData = e.detail.data as UpdateConfigData;
    schemeAttribute.value = configData.scheme ? configData.scheme : 'client_light';
    document.body.attributes.setNamedItem(schemeAttribute);
  }
});
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
