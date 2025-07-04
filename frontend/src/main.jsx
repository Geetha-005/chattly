
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

export const serverUrl = "https://real-time-chat-application-05.onrender.com";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);














// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from "react-router-dom"
// import {Provider} from  "react-redux"
// import { store } from './redux/store.js'

// export const serverUrl="http://localhost:8000"

// createRoot(document.getElementById('root')).render(
 
//   <BrowserRouter>
//   <Provider>
//        <App store={store}/>
//   </Provider>
   
//   </BrowserRouter>
   

// )
