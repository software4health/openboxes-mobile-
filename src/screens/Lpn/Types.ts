import Location from '../../data/location/Location';

export interface OwnProps {
  navigation: any;
  route: any;
}

export interface StateProps {
  selectedLocation: any;
  currentLocation?: Location | null;
}

export interface DispatchProps {
  getShipmentOrigin: (id: string, callback: (data: any) => void) => void;
  saveAndUpdateLpn: (requestBody: any, callback: (data: any) => void) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
