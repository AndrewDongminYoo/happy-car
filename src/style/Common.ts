/**
 * 이 파일은 기본 애플리케이션 스타일을 정의합니다.
 *
 * 이 파일을 사용하여 일반 컴포넌트 스타일(예: 기본 텍스트 스타일, 기본 버튼 스타일...)을 정의할 수 있습니다.
 */
import { StyleSheet } from 'react-native';
import buttonStyles from './components/Buttons';
import { CommonParams } from '../../@types/theme';

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        backgroundColor: Colors.inputBackground,
        color: Colors.textGray400,
        height: 45,
        borderRadius: 10,
        paddingStart: 20,
      },
    }),
  };
}
