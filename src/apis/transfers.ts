import apiClient from '../utils/ApiClient';

export function stockTransfers(data: any) {
  return apiClient.post('/stockTransfers', data);
}

export function getStockTransfers(data: any) {
  return apiClient.get('/stockTransfers', data);
}

export function fetchStockTransferSummary(id: string) {
  return apiClient.get(`/stockTransfers/${id}`);
}

export function completeStockTransfer(id: string) {
  return apiClient.post(`/stockTransfers/${id}/status`, {
    status: 'COMPLETED'
  });
}
