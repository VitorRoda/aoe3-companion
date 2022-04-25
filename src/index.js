import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Analytics from "analytics";
import { AnalyticsProvider } from "use-analytics";
import googleAnalytics from "@analytics/google-analytics";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DEFAULT_LANG } from "./config/language";

const analytics = Analytics({
  app: 'aoe3-deck-builder',
  plugins: [googleAnalytics({
    trackingId: 'G-NHC98Q0NJ2'
  })]
})

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
    <AnalyticsProvider instance={analytics}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AnalyticsProvider>,
    document.getElementById('root')
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

