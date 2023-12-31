export const SAVE_OR_UPDATE_LPN = 'SAVE_OR_UPDATE_LPN';
export const FETCH_CONTAINER_DETAIL = 'FETCH_CONTAINER_DETAIL';
export const FETCH_CONTAINER_DETAIL_RESPONSE_SUCCESS =
  'FETCH_CONTAINER_DETAIL_RESPONSE_SUCCESS';

export const GET_CONTAINER_DETAIL = 'GET_CONTAINER_DETAIL';
export const GET_CONTAINER_DETAIL_RESPONSE_SUCCESS =
  'GET_CONTAINER_DETAIL_RESPONSE_SUCCESS';
export const GET_CONTAINER_STATUS_DETAIL = 'GET_CONTAINER_STATUS_DETAIL';
export const GET_CONTAINER_STATUS_DETAIL_RESPONSE_SUCCESS = 'GET_CONTAINER_STATUS_DETAIL_RESPONSE_SUCCESS';

export function saveAndUpdateLpn(
  requestBody: any,
  callback: (data: any) => void,
) {

  return {
    type: SAVE_OR_UPDATE_LPN,
    payload: { requestBody },
    callback,
  };
}

export function fetchContainer(id: string, callback: (data: any) => void) {
    return {
        type: FETCH_CONTAINER_DETAIL,
        payload: { id },
        callback,
  };
}

export function getContainer(id: string, callback: (data: any) => void) {
    return {
        type: GET_CONTAINER_DETAIL,
        payload: { id },
        callback,
  };
}

export function updateContainerStatus(
    id: string,
    requestBody: any,
    callback: (data: any) => void,
) {
    return {
        type: GET_CONTAINER_STATUS_DETAIL,
        payload: { id, requestBody },
        callback
    }
}

