/* eslint-disable complexity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ToastAndroid } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import showPopup from '../../components/Popup';
import { getShipment, submitShipmentDetails } from '../../redux/actions/packing';
import AutoInputInternalLocation from '../../components/AutoInputInternalLocation';
import InputSpinner from '../../components/InputSpinner';

const ShipItemDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { item }: any = route.params;
  const [state, setState] = useState<any>({
    error: '',
    quantityPicked: 0,
    shipmentDetails: null,
    containerList: []
  });
  const [selectedContainerItem, setSelectedContainerItem] = useState();

  useEffect(() => {
    getShipmentDetails(item.shipment.shipmentNumber);
  }, []);
  const getShipmentDetails = (id: string) => {
    const callback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? 'Shipment details' : 'Error',
          message: data.errorMessage ?? `Failed to load Shipment details value ${id}`,
          positiveButton: {
            text: 'Retry',
            callback: () => {
              dispatch(getShipment(id, callback));
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        if (data && Object.keys(data).length !== 0) {
          setState({
            quantityPicked: item.quantityRemaining || 0,
            shipmentDetails: data,
            containerList: data.availableContainers.map((dataItem: any) => ({
              name: dataItem.name,
              id: dataItem.id
            }))
          });
          setSelectedContainerItem({ id: item?.container?.id || null });
        }
      }
    };
    dispatch(getShipment(id, callback));
  };

  const submitShipmentDetail = (id: string) => {
    if (Number(state.quantityPicked) > Number(item.quantityRemaining)) {
      showPopup({
        message: 'Quantity packed is higher than quantity on shipment item',
        positiveButton: {
          text: 'Ok'
        }
      });
      return;
    }

    const request = {
      action: 'PACK',
      'container.id': selectedContainerItem?.id ?? '',
      quantityToPack: state.quantityPicked
    };

    const callback = (data: any) => {
      if (data?.error) {
        showPopup({
          title: data.errorMessage ? 'Packing Error' : 'Error',
          message: data.errorMessage ?? 'Failed to pack item',
          positiveButton: {
            text: 'Retry',
            callback: () => {
              dispatch(submitShipmentDetails(id, request, callback));
            }
          },
          negativeButtonText: 'Cancel'
        });
      } else {
        ToastAndroid.showWithGravity(
          'Shipment Detail Submitted successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.navigate('OutboundStockDetails', {
          shipmentId: item.shipment.id,
          refetchShipment: true
        });
      }
    };
    dispatch(submitShipmentDetails(id, request, callback));
  };

  const quantityPickedChange = (query: string) => {
    setState({
      ...state,
      quantityPicked: query
    });
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.rowItem}>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'Container'}</Text>
          <Text style={styles.value}>{item?.container?.name ?? 'Default'}</Text>
        </View>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'Shipment Number'}</Text>
          <Text style={styles.value}>{item.shipment.shipmentNumber}</Text>
        </View>
      </View>
      <View style={styles.rowItem}>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'Product Code'}</Text>
          <Text style={styles.value}>{item.inventoryItem.product.productCode}</Text>
        </View>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'Product Name'}</Text>
          <Text style={styles.value}>{item.inventoryItem.product.name}</Text>
        </View>
      </View>
      <View style={styles.rowItem}>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'LOT Number'}</Text>
          <Text style={styles.value}>{item.inventoryItem.lotNumber ?? 'Default'}</Text>
        </View>
        <View style={styles.columnItem}>
          <Text style={styles.label}>{'Quantity to pack'}</Text>
          <Text style={styles.value}>{item.quantityRemaining}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{'Container'}</Text>
        <AutoInputInternalLocation
          label="AutoInputInternalContainer"
          data={state.containerList ?? []}
          selectedContainerItem={selectedContainerItem}
          initValue={item.container?.name || ''}
          selectedData={(selectedItem: any, index: number) => setSelectedContainerItem(selectedItem)}
        />
      </View>
      <View style={styles.alignCenterContent}>
        <InputSpinner title={'Quantity to Pick'} value={state.quantityPicked} setValue={quantityPickedChange} />
      </View>
      <View style={styles.bottom}>
        <Button
          disabled={!(state.quantityPicked && state.quantityPicked > 0)}
          title="PACK ITEM"
          onPress={() => {
            submitShipmentDetail(item?.id);
          }}
        />
      </View>
    </ScrollView>
  );
};
export default ShipItemDetails;
