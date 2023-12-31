/* eslint-disable no-shadow */
import React from 'react';
import styles from './styles';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../constants';

const ContainerDetails = ({ item }: any) => {
  const navigation = useNavigation<any>();

  const RenderData = ({ title, subText }: any): JSX.Element => {
    return (
      <View style={styles.columnItem}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.value}>{subText}</Text>
      </View>
    );
  };

  const navigateToOutboundOrderDetails = (item: any) => {
    navigation.navigate('ShipmentDetails', { item: item });
  };

  const renderListItem = (item: any, index: any) => {
    return (
      <TouchableOpacity key={index} style={styles.itemView} onPress={() => navigateToOutboundOrderDetails(item)}>
        <Card>
          <Card.Content>
            <View style={styles.rowItem}>
              <RenderData title={'Product Code'} subText={item.inventoryItem.product?.productCode} />
              <RenderData title={'Product Name'} subText={item.inventoryItem.product?.name} />
            </View>
            <View style={styles.rowItem}>
              <RenderData title={'Lot Number'} subText={item.inventoryItem.lotNumber ?? 'Default'} />
              <RenderData title={'Quantity to Pack'} subText={item.quantity} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      renderItem={({ item, index }) => renderListItem(item, index)}
      renderSectionHeader={({ section: { data, title } }) => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {data[0].container?.id &&
          <>
            <Text>{data[0]?.container?.status ?? ''}</Text>
            <TouchableOpacity style={styles.infoButton}
              onPress={() => {
                navigation.navigate('LpnDetail', {
                  id: data[0]?.container?.id,
                  shipmentNumber: data[0]?.shipment?.shipmentNumber
                });
              }}
            >
              <FontAwesome5 name="chevron-right" size={24} color={colors.headerColor} />
            </TouchableOpacity>
          </>
          }
        </View>
      )}
      sections={item}
      keyExtractor={(item, index) => item + index}
    />
  );
};
export default ContainerDetails;
