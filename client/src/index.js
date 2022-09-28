import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={ <App/> } />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
);