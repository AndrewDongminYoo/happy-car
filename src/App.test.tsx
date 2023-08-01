import 'react-native';
import React from 'react';
import App from './App';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: 테스트 렌더러는 반드시 리액트 네이티브 임포트 이후에 임포트합니다.
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from './store';

it('App renders correctly', () => {
  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(component);

  expect(component).toBeDefined();
});
