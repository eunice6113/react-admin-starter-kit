import 'core-js/stable'
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/core/store';
import { getIsAdmin, hasValidToken } from './app/core/services/base/base-api.service';
import Logout from './app/pages/auth/Logout';
import LargeLoadingBar from './app/shared/components/loading/LargeLoadingBar';

const USER_DOMAIN = process.env.REACT_APP_USER_URL
const ADMIN_DOMAIN = process.env.REACT_APP_ADMIN_URL
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY

if(process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}

  window.onload = function () {
    document.addEventListener('contextmenu', function (e:any) {
      e.preventDefault();
    }, false);

    document.addEventListener('keydown', function (e:any) {
      if (e.keyCode == 123) { //F12키 막음
          disabledEvent(e);
      } 
    }, false);

    function disabledEvent(e:any) {
      if (e.stopPropagation) {
          e.stopPropagation();
      } else if (window.event) {
          window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const rendering = () => {
  return (
    // strict mode 를 키면 dev server 에서는 2번 렌더링 된다
    //<React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>
  //</React.StrictMode>
  )
}

const loading = () => {
  return (<div className='d-flex-default justify-center' style={{width:'100%', height:'100vh'}}>
    <LargeLoadingBar />
  </div>)
}

//화면 보여주기 (TEMP)
root.render(rendering());


reportWebVitals();

