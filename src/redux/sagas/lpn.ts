import {call, put, takeLatest} from 'redux-saga/effects';
import * as api from '../../apis';
import {
  FETCH_CONTAINER_DETAIL,
  FETCH_CONTAINER_DETAIL_RESPONSE_SUCCESS,
  GET_CONTAINER_DETAIL,
  GET_CONTAINER_DETAIL_RESPONSE_SUCCESS,
  SAVE_OR_UPDATE_LPN,
  GET_CONTAINER_STATUS_DETAIL,
  GET_CONTAINER_STATUS_DETAIL_RESPONSE_SUCCESS,
} from '../actions/lpn';
import {handleError} from './error';

function* saveAndUpdateLpn(action: any) {
  try {
    const response: any = yield call(
      api.saveAndUpdateLpn,
      action.payload.requestBody,
    );

    if (response.errorCode) {
      yield action.callback({
        error: true,
        errorMessage: response.errorMessage,
      })
    } else {
      yield action.callback(response.data);
    }
  } catch (e) {
    handleError(e);
  }
}

function* fetchContainer(action: any) {
  try {
    const response = yield call(api.fetchContainer, action.payload.id);
    console.log(response);
    yield put({
      type: FETCH_CONTAINER_DETAIL_RESPONSE_SUCCESS,
      payload: response.data,
    });
    yield action.callback(response.data);
  } catch (e) {
    yield action.callback({
      error: true,
      errorMessage: e.message,
    });
  }
}

function* getContainerDetail(action: any) {
  try {
    const response = yield call(api.getContainerDetail, action.payload.id);
    yield put({
      type: GET_CONTAINER_DETAIL_RESPONSE_SUCCESS,
      payload: response.data,
    });
    yield action.callback(response.data);
  } catch (e) {
    yield action.callback({
      error: true,
      errorMessage: e.message,
    });
  }
}

function* updateContainerStatus(action: any) {
  try {
    const response = yield call(
      api.updateContainerStatus,
      action.payload.id,
      action.payload.requestBody
    );
    yield put({
      type: GET_CONTAINER_STATUS_DETAIL_RESPONSE_SUCCESS,
      payload: response.data,
    });
    yield action.callback(response.data);
  } catch (e) {
    yield action.callback({
      error: true,
      errorMessage: e.message,
    });
  }
}

export default function* watcher() {
  yield takeLatest(SAVE_OR_UPDATE_LPN, saveAndUpdateLpn);
  yield takeLatest(FETCH_CONTAINER_DETAIL, fetchContainer);
  yield takeLatest(GET_CONTAINER_DETAIL, getContainerDetail);
  yield takeLatest(GET_CONTAINER_STATUS_DETAIL, updateContainerStatus);
}
