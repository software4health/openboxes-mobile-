export const GET_SHIPMENTS_READY_TO_BE_PACKED = "GET_SHIPMENTS_READY_TO_BE_PACKED"
export const GET_SHIPMENTS_READY_TO_BE_PACKED_SUCCESS = "GET_SHIPMENTS_READY_TO_BE_PACKED_SUCCESS"
export const GET_SHIPMENT_REQUEST = "GET_SHIPMENT_REQUEST"
export const GET_SHIPMENT_SUCCESS = 'GET_SHIPMENT_SUCCESS';
export const GET_SHIPMENT_ORIGIN_REQUEST = "GET_SHIPMENT_ORIGIN_REQUEST"
export const GET_SHIPMENT_ORIGIN_SUCCESS = 'GET_SHIPMENT_ORIGIN_SUCCESS';
export const GET_SHIPMENT_TYPE_REQUEST = "GET_SHIPMENT_TYPE_REQUEST"
export const GET_SHIPMENT_TYPE_SUCCESS = 'GET_SHIPMENT_TYPE_SUCCESS';

export const GET_CONTAINER_DETAILS_REQUEST = "GET_CONTAINER_DETAILS_REQUEST";
export const GET_CONTAINER_DETAILS_SUCCESS = 'GET_CONTAINER_DETAILS_SUCCESS';
export const GET_SUBMIT_SHIPMENT_DETAILS_REQUEST = "GET_SUBMIT_SHIPMENT_DETAILS_REQUEST"
export const GET_SUBMIT_SHIPMENT_DETAILS_SUCCESS = "GET_SUBMIT_SHIPMENT_DETAILS_SUCCESS"

export const getShipmentsReadyToBePacked = (locationId: string, shipmentStatusCode: string, callback: (shipments: any) => void) => {
    return {
        type: GET_SHIPMENTS_READY_TO_BE_PACKED,
        payload: {locationId, shipmentStatusCode},
        callback
    };
}

export const getShipment = (id: any, callback: (products: any) => void) => {
    return {
        type: GET_SHIPMENT_REQUEST,
        payload: {id},
        callback
    };
}

export const getContainerType = (callback: (products: any) => void, id?: any) => {
    return {
        type: GET_SHIPMENT_TYPE_REQUEST,
        payload: {id},
        callback
    };
}

export const getShipmentOrigin = (id: any, callback: (products: any) => void) => {
    return {
        type: GET_SHIPMENT_ORIGIN_REQUEST,
        payload: {id},
        callback
    };
}
export const getContainerDetails = (id: string, callback?: (products: any) => void) => {
    return {
        type: GET_CONTAINER_DETAILS_REQUEST,
        payload: {id},
        callback
    }
}

export const submitShipmentDetails = (id: string, requestBody: any, callback?: (products: any) => void) => {
    return {
        type: GET_SUBMIT_SHIPMENT_DETAILS_REQUEST,
        payload: {id, requestBody},
        callback
    }
}
