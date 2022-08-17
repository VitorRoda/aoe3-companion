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

  const { stringtable: { language: { string } } } = await import(`./data/localization/stringtabley_${lang}.json`)

  window.dictIndexed = string.reduce((obj, item) => {
    obj[item?.['@_locid']] = item
    return obj
  }, {})

  window.dictSymbolIndexed = string.filter(item => !!item?.['@symbol']).reduce((obj, item) => {
    obj[item?.['@symbol'].toLowerCase()] = item
    return obj
  }, {})
}

(async () => {
  await loadTranslations();

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root')
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

