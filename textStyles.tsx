import {StyleSheet} from 'react-native';
import {COLOR} from './helpers/constants';

const textStyles = StyleSheet.create({
  xs: {
    fontSize: 12,
    color: COLOR.text,
  },
  sm: {
    fontSize: 16,
    color: COLOR.text,
  },
  md: {
    fontSize: 20,
    color: COLOR.text,
  },
  lg: {
    fontSize: 24,
    color: COLOR.text,
  },
  xl: {
    fontSize: 28,
    color: COLOR.text,
  },
  xl2: {
    fontSize: 32,
    color: COLOR.text,
  },
  xl3: {
    fontSize: 36,
    color: COLOR.text,
  },
  xl4: {
    fontSize: 40,
    color: COLOR.text,
  },
  bold: {
    fontWeight: 700,
  },
  grey: {
    color: COLOR.grey,
  },
  white: {
    color: COLOR.white,
  },
  center: {
    textAlign: 'center',
  },
  italic: {
    fontStyle: 'italic',
  },
});
export default textStyles;
