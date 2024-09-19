import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './AppRouter';
import TeacherDash from './components/teachers/TeacherDash';
import WebcamCapture from './components/Webcam/WebcamCapture';
import App from './components/Webcam/App';
import ParentDash from './components/parents/Navbar';
import Main from './components/parents/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
    {/* <WebcamCapture/> */}
    {/* <App/> */}
    {/* <Main/> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
