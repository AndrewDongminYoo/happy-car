import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import ApplicationNavigator from './navigators/Application';
import './translations';

const App = () => (
  <Provider store={store}>
    {/**
     * `PersistGate` 구성 요소는 Redux 애플리케이션에서 지속 상태가 검색되어 Redux에 저장될 때까지 앱의 UI 렌더링을 지연시키는 데 사용됩니다.
     * `loading` 프로퍼티는 `null`이거나 로딩 중에 표시할 리액트 인스턴스(예: <SplashScreen />)일 수 있습니다.
     *
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
);

export default App;
