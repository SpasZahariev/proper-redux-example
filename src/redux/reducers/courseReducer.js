import * as types from "../actions/actionTypes";
// when the app starts this state is an empty []
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // whatever is returned from this becomes the new state for the reducer
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
