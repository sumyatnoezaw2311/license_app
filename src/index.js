import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './app/store'
import ReactDOM from 'react-dom/client';
import App from './App';
import "react-datepicker/dist/react-datepicker.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './scss/custom.scss'
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
