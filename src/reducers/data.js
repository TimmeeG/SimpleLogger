import {
  LOG_DATA_POINT,
  DELETE_DATA_POINT,
  EDIT_DATA_POINT,
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

    case DELETE_DATA_POINT:
      return {
        ...state,
        set: state.set.filter(data => data.name !== action.payload),
      };
    case EDIT_DATA_POINT:
      return {
        ...state,
        currentSet: action.payload,
      };
    default:
      return state;
  }
}
