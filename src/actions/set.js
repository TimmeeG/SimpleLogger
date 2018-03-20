import { CREATE_NEW_SET, DELETE_SET, CHANGE_SET } from './types';

export const createNewSet = title => async dispatch => {
  dispatch({
    type: CREATE_NEW_SET,
    payload: title,
  });
};

export const deleteSet = title => async dispatch => {
  dispatch({
    type: DELETE_SET,
    payload: title,
  });
};

export const changeCurrentDataSet = title => async dispatch => {
  dispatch({
    type: CHANGE_SET,
    payload: title,
  });
};
