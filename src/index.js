import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DEFAULT_LANG } from "./config/language";

async function loadTranslations() {
  let lang = localStorage.getItem('lang')

  if (lang === null) {
    lang = DEFAULT_LANG.code
  }

  const data = await import(`./data/localization/stringtabley_${lang}.json`)
  window.dict = data?.language?.string
}

(async () => {
  await loadTranslations();

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

