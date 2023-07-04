import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {
  Common,
  Fonts,
  Gutters,
  Images,
  Layout,
  themes,
  DefaultVariables,
} from '../style';
import { ThemeState } from '../store/theme';
import {
  ThemeVariables,
  Theme,
  ThemeNavigationTheme,
  ThemeNavigationColors,
} from '../../@types/theme';

/** 디바이스 컬러 스키마와 Redux Store 내의 현재 테마 설정을 기반으로 현재 테마를 빌드하고 반환하는 역할을 하는 함수 */
export default function () {
  // 디바이스 컬러 스키마 가져오기
  const colorScheme = useColorScheme();

  // 리덕스 스토어에서 현재 설정된 테마 가져오기
  const currentTheme = useSelector(
    (state: { theme: ThemeState }) => state.theme.theme,
  );
  const isDark = useSelector(
    (state: { theme: ThemeState }) => state.theme.darkMode,
  );
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark;

  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};

  if (currentTheme !== 'default') {
    const {
      Variables,
      // @ts-ignore 중복된 테마 처리를 방지.
      ...themeConfig
    } = themes[currentTheme] || {};

    variables = Variables;
    partialTheme = themeConfig || {};
  }

  if (darkMode) {
    const { Variables, ...darkThemeConfig } =
      themes[`${currentTheme}_dark` as keyof typeof themes] || {};

    darkVariables = Variables;
    partialDarkTheme = darkThemeConfig;
  }

  const themeVariables = mergeVariables(variables, darkVariables);

  const fonts = Fonts(themeVariables);
  const gutters = Gutters(themeVariables);
  const images = Images(themeVariables);
  const layout = Layout(themeVariables);
  const common = Common({
    ...themeVariables,
    Layout: Layout(themeVariables),
    Gutters: Gutters(themeVariables),
    Fonts: Fonts(themeVariables),
    Images: Images(themeVariables),
  });

  // 기본 테마 빌드
  const baseTheme: Theme<
    typeof fonts,
    typeof gutters,
    typeof images,
    typeof layout,
    typeof common
  > = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Layout: layout,
    Common: common,
    ...themeVariables,
  };

  // 현재 테마 병합 및 반환
  return buildTheme(
    darkMode,
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {}),
  );
}

/**
 * 일련의 변수와 부분 테마를 가져오고 각 테마 속성에 대해 생성된 값과 함께 서식이 지정된 테마 개체를 반환
 *
 * @param {ThemeVariables} variables - 테마 변수를 나타내는 객체입니다. 여기에는 키가 변수의 이름이고 값이 해당 변수의 값인 키-값 쌍이 포함됩니다.
 * @param {Partial<Theme<F, G, I, L, C>>} theme - 이는 `F`, `G`, `I`, `Theme` 유형에 정의된 속성 중 일부 또는 전부를 포함할 수 있는 개체.
 * @return {Theme<F, G, I, L, C>} 각 키-값 쌍이 `theme` 객체의 키-값 쌍에 해당하는 객체를 반환합니다. 값은 `variables` 인수로 해당 `generate` 함수를 호출한 결과
 */
const formatTheme = <F, G, I, L, C>(
  variables: ThemeVariables,
  theme: Partial<Theme<F, G, I, L, C>>,
) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    };
  }, theme);
};

/**
 * 'mergeVariables' 기능은 테마 구성과 어두운 테마 구성을 단일 개체로 병합
 *  baseTheme <- currentTheme <- currentDarkTheme
 *
 * @param {Partial<ThemeVariables>} themeConfig - 테마 변수의 부분 개체입니다. `ThemeVariables` 유형의 하위 집합이 포함됩니다.
 * @param {Partial<ThemeVariables>} darkThemeConfig - `darkThemeConfig` - 어두운 테마에 대한 구성을 나타내는 객체입니다.
 *
 * @return {Partial<ThemeVariables>} - `themeConfig` 및 `darkThemeConfig` 객체를 `DefaultVariables` 객체와 병합해 반환.
 */
const mergeVariables = (
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>,
) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (themeConfig as any)[group];
    const darkTheme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (darkThemeConfig as any)[group];

    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};

/**
 * 다크 모드, 기본 테마 및 테마 구성에 대한 부울 값을 가져오고 다크 모드 설정과 함께 병합된 테마 객체를 반환
 *
 * @param {boolean} darkMode 다크 모드 활성화 여부를 나타내는 부울 값
 * @param {Theme<F, G, I, L, C>} baseTheme - 기본 테마 구성을 나타내는 객체입니다.
 *    여기에는 색상, 글꼴, 아이콘, 레이아웃 및 구성 요소와 같은 다양한 테마 요소에 대한 속성이 포함됩니다.
 * @param {Partial<Theme<F, G, I, L, C>>} themeConfig - 부분적인 테마 구성을 포함하는 개체입니다.
 *    Theme<F, G, I, L, C>는 전체 테마 구성을 나타내는 일반 유형입니다. 분 테마 구성을 사용하면 재정의할 수 있습니다.
 * @param {Partial<Theme<F, G, I, L, C>>} darkThemeConfig - 어두운 모드에 대한 특정 테마 속성을 포함하는 선택적 부분 테마 구성 개체입니다. 이를 통해
 *    `themeConfig` 매개변수 또는 `baseTheme`에 정의된 모든 속성을 재정의하여 다크 모드용으로 특별히 테마를 사용자 지정할 수 있습니다.
 *
 * @returns {Theme<F, G, I, L, C>} - 병합된 테마 구성, `darkMode` 부울 값 및 `NavigationTheme` 객체를 포함하는 객체를 반환
 */
const buildTheme = <F, G, I, L, C>(
  darkMode: boolean,
  baseTheme: Theme<F, G, I, L, C>,
  themeConfig: Partial<Theme<F, G, I, L, C>>,
  darkThemeConfig: Partial<Theme<F, G, I, L, C>>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors,
    ),
  };
};

/**
 * `baseTheme` 객체보다 `theme` 및 `darkTheme` 객체의 값에 우선 순위를 지정하여 3개의 테마 객체를 병합
 *
 * @param {Theme<F, G, I, L, C>} baseTheme - 기본 테마를 나타내는 객체입니다. 다음과 같은 유형 서명이 있습니다.
 * @param {Partial<Theme<F, G, I, L, C>>} theme - `baseTheme`와 병합하려는 부분 테마를 나타내는 객체입니다. `baseTheme`의 각 속성에 대한 부분 값을 포함
 * @param {Partial<Theme<F, G, I, L, C>>} darkTheme - `baseTheme` 객체의 특정 속성에 대한 재정의를 포함하는 부분 테마 객체입니다. 다크 모드 또는 기타 특정 테마 변형에 맞게 특별히 테마를 사용자 지정할 수 있습니다.
 * @returns {Theme<F, G, I, L, C>} - `(baseTheme)`,`(theme)`,`(darkTheme)`의 병합이 반환되어 새로운 테마 객체 반환.
 */
const mergeTheme = <F, G, I, L, C>(
  baseTheme: Theme<F, G, I, L, C>,
  theme: Partial<Theme<F, G, I, L, C>>,
  darkTheme: Partial<Theme<F, G, I, L, C>>,
) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...((value as any) || {}),
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    baseTheme,
  ) as typeof baseTheme;

/**
 * React Navigation 테마를 재정의 색상과 병합합니다.
 *
 * @param {ThemeNavigationTheme} reactNavigationTheme - React Navigation의 테마 구성을 나타내는 객체입니다.
 *    일반적으로 앱에서 탐색 구성 요소의 시각적 모양과 동작을 정의하는 `colors`, `fonts`, `spacing` 등과 같은 속성을 포함
 * @param {Partial<ThemeNavigationColors>} overrideColors `reactNavigationTheme`의 색상에 대한 부분 재정의를 포함하는 객체입니다.
 *    전체 테마를 재정의하지 않고도 탐색 테마의 특정 색상을 사용자 지정할 수 있습니다.
 * @returns {{colors}} 병합된 리액트 네비게이션 테마를 반환합니다.
 */
const mergeNavigationTheme = (
  reactNavigationTheme: ThemeNavigationTheme,
  overrideColors: Partial<ThemeNavigationColors>,
) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
});
