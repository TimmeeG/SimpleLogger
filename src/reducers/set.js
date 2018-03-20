import { CREATE_NEW_SET } from './../actions';

const initialState = {
  set: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_SET:
      return {
        ...state,
        set: [...state.set, { name: action.payload }],
      };
    default:
      return state;
  }
}
