/**
 * 이 파일에는 기본 다크테마에 대한 애플리케이션의 변수가 포함되어 있습니다.
 *
 * 색상, 크기 등을 모든 컴포넌트에 복제하지 말고 여기에서 정의하세요.
 * 나중에 더 쉽게 변경할 수 있습니다.
 */
import { ThemeNavigationColors } from '../../../../@types/theme';

/**
 * 미리 선언한 컬러 상수.
 */
export const Colors = Object.freeze({
  inputBackground: '#3A3A3A',
  // Typography
  textGray800: '#E0E0E0',
  textGray400: '#969696',
  textGray200: '#BABABA',
  primary: '#7454A5',
  // ComponentColors
  circleButtonBackground: '#252732',
});

export const NavigationColors: Partial<ThemeNavigationColors> = Object.freeze({
  primary: Colors.primary,
  background: '#1B1A23',
  card: '#1B1A23',
  // text: string,
  // border: string,
  // notification: string,
});

export default {
  Colors,
  NavigationColors,
};
