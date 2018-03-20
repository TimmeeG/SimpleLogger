import { CREATE_NEW_SET, DELETE_SET, CHANGE_SET } from './../actions';

const initialState = {
  set: [],
  currentSet: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_SET:
      return {
        ...state,
        set: [...state.set, { name: action.payload }],
      };
    case DELETE_SET:
      return {
        ...state,
        set: state.set.filter(setName => setName.name !== action.payload),
      };
    case CHANGE_SET:
      return {
        ...state,
        currentSet: action.payload,
      };
    default:
      return state;
  }
}
