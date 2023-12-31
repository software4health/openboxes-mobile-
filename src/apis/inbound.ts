import apiClient from '../utils/ApiClient';

export function fetchInboundOrderList(id: string = '') {
  return apiClient.get(`/shipments?destination.id=${id}`);
}

export function fetchPartialReceiving(id: string = '') {
  return apiClient.get(`/partialReceiving/${id}`);
}

export function submitPartialReceiving(id: string, requestBody: any) {
  return apiClient.post(`/partialReceiving/${id}`, requestBody);
}
