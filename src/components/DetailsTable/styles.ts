import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

const columnStyle = (columnNumber: number) => {
  const width = 100 / columnNumber;
  return StyleSheet.create({
    column: {
      width: `${width}%`,
      marginBottom: 10
    }
  });
};

export { columnStyle };
