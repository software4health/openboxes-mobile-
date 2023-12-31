import InventoryItem from '../picklist/InventoryItem';

interface ShipmentItems {
  receiptItemId: string | null;
  shipmentItemId: string;
  'container.id': string;
  'container.name': string;
  'parentContainer.id': string | null;
  'parentContainer.name': string | null;
  'product.id': string;
  'product.productCode': string;
  'product.name': string;
  'product.lotAndExpiryControl': string | null;
  lotNumber: string;
  expirationDate: string | null;
  'binLocation.id': string;
  'binLocation.name': string;
  'binLocation.zoneId': string | null;
  'binLocation.zoneName': string | null;
  'recipient.id': string | null;
  'recipient.name': string | null;
  quantityShipped: number;
  quantityReceived: number;
  quantityCanceled: number;
  quantityReceiving: string | null;
  quantityRemaining: number;
  cancelRemaining: false;
  quantityOnHand: string | null;
  comment: string | null;
  status: string;
  inventoryItem: InventoryItem | null;
}

export default ShipmentItems;
