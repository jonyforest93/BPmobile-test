import './assets/styles/main.scss'

const SEARCH_PARAM_LANG = 'lang'
const DEFAULT_LOCALE = 'en'
const YEAR_BTN_LINK = 'https://apple.com/'
const WEEK_BTN_LINK = 'https://google.com/'

import translateEn from './locales/en.json'
import translateDe from './locales/de.json'
import translateEs from './locales/es.json'
import translateFr from './locales/fr.json'
import translateJa from './locales/ja.json'
import translatePt from './locales/pt.json'

const LANGS = {
  en: translateEn,
  de: translateDe,
  es: translateEs,
  fr: translateFr,
  ja: translateJa,
  pt: translatePt
}

const supportedLangs = ['en', 'de', 'es', 'fr', 'ja', 'pt']
let continueBtnLink = YEAR_BTN_LINK

const yearBtnWrapper = document.querySelector('.yearly-btn__wrapper')
const yearBtn = document.querySelector('.yearly-btn')
const weekBtn = document.querySelector('.weekly-btn')
const continueBtn = document.querySelector('.continue-btn')

function togglePlan(isYearly) {
  yearBtnWrapper.classList.toggle('active', isYearly);
  yearBtn.classList.toggle('active', isYearly);
  weekBtn.classList.toggle('active', !isYearly);
  continueBtnLink = isYearly ? YEAR_BTN_LINK : WEEK_BTN_LINK;
}

yearBtn.addEventListener('click', () => togglePlan(true));
weekBtn.addEventListener('click', () => togglePlan(false));

continueBtn.addEventListener('click', () => {
  window.location.href = continueBtnLink;
});

function detectLang() {
  const url = new URL(window.location.href)
  const param = url.searchParams.get(SEARCH_PARAM_LANG)

  if (!param || param === DEFAULT_LOCALE) {
    return DEFAULT_LOCALE
  }

  const isSupportedLocale = supportedLangs.includes(param)

  return isSupportedLocale ? param : DEFAULT_LOCALE
}

function reductionFont(el) {
  while (
    el.scrollHeight > el.clientHeight &&
    parseFloat(getComputedStyle(el).fontSize) > 10
  ) {
    el.style.fontSize =
      parseFloat(getComputedStyle(el).fontSize) - 1 + 'px';
  }
}

function translatePage(lang) {
  const dict = LANGS[lang]

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate
    let text = dict[key] || key

    const price = el.dataset.price

    if (price) {
      text = text.replace('{{price}}', price)
    }

    el.innerHTML = text

    reductionFont(el)
  })
}



const lang = detectLang()
translatePage(lang)

