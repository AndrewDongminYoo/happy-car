/**
 * 이 파일에는 애플리케이션의 변수가 포함되어 있습니다.
 *
 * 색상, 크기 등을 모든 컴포넌트에 복제하지 말고 여기에서 정의하세요.
 * 나중에 더 쉽게 변경할 수 있습니다.
 */

import { ThemeNavigationColors } from '../../@types/theme';

/**
 * 미리 선언한 컬러 상수.
 */
export const Colors = Object.freeze({
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#FFFFFF',
  //Typography
  textGray800: '#000000',
  textGray400: '#4D4D4D',
  textGray200: '#A1A1A1',
  primary: '#E14032',
  success: '#28A745',
  error: '#DC3545',
  //ComponentColors
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',
});

export const NavigationColors: Partial<ThemeNavigationColors> = Object.freeze({
  primary: Colors.primary,
  background: '#EFEFEF',
  card: '#EFEFEF',
});

/**
 * 폰트 사이즈도 마찬가지로 직접 숫자로 지정하지 않습니다.
 */
export const FontSize = Object.freeze({
  tiny: 14,
  small: 16,
  regular: 20,
  large: 40,
});

/**
 * 메트릭 사이즈(마진, 패딩) 또한 숫자로 직접 지정하는 것은 바람직하지 않습니다.
 * 사용하는 측에서 상수를 재정의 시도하지 않도록 유의하세요.
 */
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = Object.freeze({
  tiny,
  small,
  regular,
  large,
});

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
