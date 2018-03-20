import { CREATE_NEW_SET } from './types';

export const createNewSet = title => async dispatch => {
  dispatch({
    type: CREATE_NEW_SET,
    payload: title,
  });
};
