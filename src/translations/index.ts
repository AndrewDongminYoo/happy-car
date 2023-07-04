import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];

/**
 * `i18n.use(initReactI18next).init({...})` 코드는 react-i18next에서 제공된 구성 옵션으로 i18next 라이브러리를 초기화
 *
 * @see https://www.i18next.com/overview/configuration-options
 */
i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  },
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: {
    /** 리액트에서는 기본적으로 이스케이프되므로 필요하지 않습니다. */
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
