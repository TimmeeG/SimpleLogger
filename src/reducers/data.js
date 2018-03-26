import {
  LOG_DATA_POINT,
  DELETE_DATA_POINT,
  EDIT_DATA_POINT,
  DELETE_SET,
} from './../actions';

const initialState = {
  data: [],
  dataPoint: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_DATA_POINT: {
      const { set, dataPoint, timeStamp } = action.payload;

      return {
        ...state,
        data: [
          ...state.data,
          {
            set,
            timeStamp,
            dataPoint,
          },
        ],
      };
    }
    case DELETE_SET:
      return {
        ...state,
        data: state.data.filter(point => point.set !== action.payload),
      };
    case DELETE_DATA_POINT:
      return {
        ...state,
        data: state.data.filter(point => point.timeStamp !== action.payload),
      };
    case EDIT_DATA_POINT: {
      const oldItemIndex = state.data.findIndex(
        point => point.timeStamp === action.payload.timeStamp,
      );

      return {
        ...state,
        data: [
          ...state.data.slice(0, oldItemIndex),
          action.payload,
          ...state.data.slice(oldItemIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
}
