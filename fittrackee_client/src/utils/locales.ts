import type { Locale } from 'date-fns'
import {
  bg,
  cs,
  de,
  enUS,
  es,
  eu,
  fr,
  gl,
  it,
  nb,
  nl,
  pl,
  pt,
} from 'date-fns/locale'

import type { TLanguage } from '@/types/locales'

export const isLanguageSupported = (
  language: string
): language is TLanguage => {
  return [
    'bg',
    'cs',
    'de',
    'en',
    'es',
    'eu',
    'fr',
    'gl',
    'it',
    'nb',
    'nl',
    'pl',
    'pt',
  ].includes(language)
}

export const localeFromLanguage: Record<TLanguage, Locale> = {
  bg: bg,
  cs: cs,
  de: de,
  en: enUS,
  es: es,
  eu: eu,
  fr: fr,
  gl: gl,
  it: it,
  nb: nb,
  nl: nl,
  pl: pl,
  pt: pt,
}

export const languageLabels: Record<TLanguage, string> = {
  bg: 'български',
  cs: 'Česky (73%)',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  eu: 'Euskara (99%)',
  fr: 'Français',
  gl: 'Galego',
  it: 'Italiano (82%)',
  nl: 'Nederlands (99%)',
  nb: 'Norsk bokmål (52%)',
  pl: 'Polski (91%)',
  pt: 'Português (98%)',
}

export const availableLanguages = Object.keys(languageLabels).map((l) => {
  return { label: languageLabels[l as TLanguage], value: l }
})
