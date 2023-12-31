import { StyleSheet } from 'react-native';
import Theme from '../../utils/Theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: -1
  },
  itemView: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 5
  },
  rowItem: {
    flexDirection: 'row',
    borderColor: Theme.colors.background,
    marginTop: 1,
    padding: 2,
    marginStart: 4,
    width: '100%',
    alignItems: 'center'
  },
  columnItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    width: '50%'
  },
  label: {
    fontSize: 12,
    color: Theme.colors.placeholder
  },
  value: {
    fontSize: 16,
    color: Theme.colors.text,
    width: '90%'
  },
  bottom: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 55,
    bottom: 25,
    marginTop: 20
  }
});
