import { DispatchProps, Props, State } from '../OutboundStockDetails/types';
import React from 'react';
import {Alert, FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { hideScreenLoading, showScreenLoading } from '../../redux/actions/main';
import { RootState } from '../../redux/reducers';
import styles from '../OutboundStockDetails/styles';
import { getShipment } from '../../redux/actions/packing';
import OrderDetailsSection from "./OrderDetailsSection";
import EmptyView from "../../components/EmptyView";
import { Shipment, Container } from "../../data/container/Shipment";
import {Card} from "react-native-paper";
import {LayoutStyle} from "../../assets/styles";
import _ from "lodash";
import InputBox from "../../components/InputBox";
import showPopup from "../../components/Popup";

// Shipment loading
class OutboundLoadingDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      shipment: null,
      scannedContainer: '',
    };
  }

  componentDidMount() {
    this.fetchShipment();
  }

  componentDidUpdate() {
    if (this.props.route.params.refetchShipment) {
      this.fetchShipment();
    }
  }

  actionCallback = (data: any) => {
    if (!data || data?.error) {
      return Promise.resolve(null);
    } else {
      if (data?.loadedContainerCount === data?.totalContainerCount) {
        Alert.alert(
          'All containers are loaded', // title
          'What do you want to do now?', // message
          [
            { // button list
              text: 'See the details',
              onPress: () => null
            },
            {
              text: 'Go to the loading list',
              onPress: () => this.props.navigation.navigate('OutboundLoadingList')
            }],
          {
            cancelable: false
          },
        );
      }

      this.setState({
        shipment: data,
        scannedContainer: ''
      });
    }
    this.props.hideScreenLoading();
  };

  fetchShipment = () => {
    const { shipmentId } = this.props.route.params;
    this.props.navigation.setParams({ refetchShipment: false });
    this.props.showScreenLoading('Loading..');
    this.props.getShipment(shipmentId, this.actionCallback);
  };

  showLoadingLPNScreen = (container: Container, shipment: Shipment | null, scanned?: boolean) => {
    this.props.navigation.navigate('OutboundLoadingContainer', {
      container: container,
      shipment: shipment,
      scanned
    });
  };

  findMatchingContainer = (searchTerm: string) => {
    return _.find(this.state.shipment?.availableContainers, (container: Container) => (
      container?.name?.toLowerCase() === searchTerm?.toLowerCase() ||
      container?.containerNumber?.toLowerCase() === searchTerm?.toLowerCase()
    ));
  }

  onContainerScan = (value: string) => {
    this.setState({ scannedContainer: value }, () => {
      if (value) {
        const matchingContainer = this.findMatchingContainer(value);
        if (matchingContainer) {
          this.setState({
            scannedContainer: '' // reset scan value before redirecting
          }, () => this.showLoadingLPNScreen(matchingContainer, this.state.shipment, true));
        }
      }
    });
  }

  onContainerScanEnd = (value: string) => {
    if (value) {
      const matchingContainer = this.findMatchingContainer(value);
      if (matchingContainer) {
        this.showLoadingLPNScreen(matchingContainer, this.state.shipment, true);
      } else {
        showPopup({
          message: `The LPN: ${value} is not for this order`,
        });
        this.setState({ scannedContainer: '' });
      }
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.contentContainer}>
          <OrderDetailsSection shipment={this.state.shipment} />
          <InputBox
            style={styles.scanSearch}
            value={this.state.scannedContainer}
            disabled={false}
            editable={false}
            label={'Scan LPN'}
            onChange={this.onContainerScan}
            onEndEdit={this.onContainerScanEnd}
          />
          <FlatList
            data={this.state.shipment?.availableContainers}
            ListEmptyComponent={
              <EmptyView title="Loading" description="There are no containers available" isRefresh={false} />
            }
            renderItem={(container: ListRenderItemInfo<Container>) => (
              <Card
                style={LayoutStyle.listItemContainer}
                onPress={() => this.showLoadingLPNScreen(container.item, this.state.shipment)}
              >
                <Card.Content>
                  <View style={styles.row}>
                    <View style={styles.col50}>
                      <Text style={styles.label}>Container Name</Text>
                      <Text style={styles.value}>{container.item?.name}</Text>
                    </View>
                    <View style={styles.col50}>
                      <Text style={styles.label}>Container Number</Text>
                      <Text style={styles.value}>{container.item?.containerNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.col50}>
                      <Text style={styles.label}>Container Type</Text>
                      <Text style={styles.value}>{container.item?.containerType?.name}</Text>
                    </View>
                    <View style={styles.col50}>
                      <Text style={styles.label}>Container Status</Text>
                      <Text style={styles.value}>{container.item?.status}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentLocation: state.mainReducer.currentLocation
});

const mapDispatchToProps: DispatchProps = {
  showScreenLoading,
  hideScreenLoading,
  getShipment
};

export default connect(mapStateToProps, mapDispatchToProps)(OutboundLoadingDetails);
