interface PutAwayItems {
  id: string;
  'stockMovement.id': string;
  'stockMovement.name': string;
  putawayStatus: string;
  transactionNumber: string;
  'currentFacility.id': string;
  'currentFacility.name': string;
  'currentLocation.id': string;
  'currentLocation.name': string;
  container: string;
  'product.id': string;
  'product.productCode': string;
  'product.name': string;
  'inventoryItem.id': string;
  'inventoryItem.lotNumber': string;
  'inventoryItem.expirationDate': string;
  'recipient.id': string;
  'recipient.name': string;
  currentBins: '';
  'preferredBin.id': string;
  'preferredBin.name': string;
  'preferredBin.zoneId': string;
  'preferredBin.zoneName': string;
  currentBinsAbbreviated: '';
  'putawayFacility.id': string;
  'putawayFacility.name': number;
  'putawayLocation.id': string;
  'putawayLocation.name': string;
  'putawayLocation.zoneId': string;
  'putawayLocation.zoneName': string;
  quantity: number;
  quantityAvailable: number;
}
export default PutAwayItems;
