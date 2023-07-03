/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: jest/global 환경설정으로 이미 jest와 함께 제공되는 타입 사용가능하지만, 명시적으로 임포트해서 사용해야 합니다.
import { it } from '@jest/globals';

// Note: 테스트 렌더러는 반드시 리액트 네이티브 이후에 임포트합니다.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
