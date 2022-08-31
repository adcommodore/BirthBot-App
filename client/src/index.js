import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import './fonts/SofiaProBlack.otf';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/messages/msgSlice';
import { userApiSlice } from './features/users/userSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

store.dispatch(extendedApiSlice.endpoints.getMesssages.initiate());
store.dispatch(userApiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={ <App/> } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);