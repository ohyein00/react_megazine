import { DefaultTheme } from 'styled-components';

const bgColor = {
  white: '#fff',
  gray: '#efefef',
  black: '#000',
};
const colors = {
  white: '#fff',
  black: '#000',
  point_0: '#493462',
  point_1: '#7856a9',
  point_2: '#b887c2',
  point_3: '#e8a8c4',
  point_4: '#bbb0ff',
  point_4_1: '#dcd6ff',
  point_5: '#cbddf6',
  point_6: '#f0ebfd',
  gray_0: '#e3e3e3',
  gray_1: '#8d898e',
  gray_2: '#555',
};
export type ColorsTypes = typeof colors;
export type BgColorTypes = typeof bgColor;
  const theme: DefaultTheme = {
  colors,
  bgColor,
};

export default theme;
