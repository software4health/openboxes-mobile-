import { StyleSheet } from 'react-native';
import Theme from '../../utils/Theme';

export default StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 8
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    borderRadius: Theme.roundness,
    borderColor: Theme.colors.backdrop,
    borderWidth: 1,
    margin: 4,
    padding: 4,
    justifyContent: 'center'
  },
  name: {
    fontSize: 17,
    color: Theme.colors.text,
    fontWeight: 'bold'
  },
  boxHeading: {
    fontSize: 15,
    color: Theme.colors.text,
    fontWeight: 'bold',
    marginTop: 8
  },
  box: {
    borderColor: Theme.colors.onBackground,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    padding: 8
  },
  descriptionLabel: {
    fontSize: 20,
    color: Theme.colors.text,
    fontWeight: 'bold',
    marginTop: 8
  },
  descriptionText: {
    fontSize: 16,
    color: Theme.colors.text,
    borderColor: Theme.colors.onBackground,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    padding: 8
  },
  detailsLabel: {
    fontSize: 20,
    color: Theme.colors.text,
    fontWeight: 'bold',
    marginTop: 8
  },
  detailsContainer: {
    padding: 8,
    borderColor: Theme.colors.onBackground,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8
  },
  detailsItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0
  },
  detailsItemName: {
    fontSize: 16,
    color: Theme.colors.text,
    fontWeight: 'bold'
  },
  detailsItemValue: {
    fontSize: 16,
    color: Theme.colors.text,
    marginStart: 8
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    borderColor: Theme.colors.onBackground,
    borderWidth: 1,
    borderRadius: 8
  },
  textAlign: {
    textAlign: 'right'
  },
  tinyLogo: {
    width: '100%',
    height: '20%'
  },
  logo: {
    width: 66,
    height: 58
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%'
  },
  listItemNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    marginStart: 4,
    width: '50%'
  },
  listItemCategoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    marginStart: 4,
    marginTop: 4
  },
  listItemCategoryLabel: {
    fontSize: 12,
    color: Theme.colors.placeholder
  },
  listItemCategory: {
    fontSize: 16,
    color: Theme.colors.text
  },
  row: {
    flexDirection: 'row',
    borderColor: Theme.colors.onBackground,
    // borderBottomWidth: 1,
    marginTop: 1,
    padding: 2,
    width: '100%'
  },
  col50: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0,
    marginStart: 4,
    width: '50%'
  },
  itemView: {
    marginStart: 5,
    marginEnd: 5,
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
    fontSize: 12,
    color: Theme.colors.text,
    width: '90%'
  },
  buttonBar: {
    padding: 1
  },
  headerTitle: {
    fontWeight: 'normal',
    fontSize: 14,
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoButton: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
    alignItems: 'center'
  },
  scanSearch: {
    marginHorizontal: 8,
    backgroundColor: 'white'
  },
});
