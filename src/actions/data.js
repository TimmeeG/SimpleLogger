import { LOG_DATA_POINT, EDIT_DATA_POINT, DELETE_DATA_POINT } from './types';

export const logDataPoint = data => async dispatch => {
  dispatch({
    type: LOG_DATA_POINT,
    payload: data,
  });
};

export const editDataPoint = data => async dispatch => {
  dispatch({
    type: EDIT_DATA_POINT,
    payload: data,
  });
};

export const deleteDataPoint = timeStamp => async dispatch => {
  dispatch({
    type: DELETE_DATA_POINT,
    payload: timeStamp,
  });
};
