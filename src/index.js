import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const domNode = document.getElementById('root');

const root = ReactDOM.createRoot(domNode);
// const root = ReactDOM.hydrateRoot(domNode,
//   <Provider store={store}>
//     <App />
//   </Provider>);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
