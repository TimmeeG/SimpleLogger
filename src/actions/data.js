import { LOG_DATA_POINT } from './types';

export const logDataPoint = data => async dispatch => {
  dispatch({
    type: LOG_DATA_POINT,
    payload: data,
  });
};
