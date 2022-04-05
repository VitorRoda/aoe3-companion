import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function  loadTranslations() {
  const langConfig = JSON.parse(localStorage.getItem('langEsp'))
  let lang = 'es'

  if (langConfig === false) {
    lang = 'en'
  }

  const data = await import(`./data/localization/stringtabley_${lang}.json`)
  window.dict = data?.language?.string
}

(async () => {
  await loadTranslations();

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

