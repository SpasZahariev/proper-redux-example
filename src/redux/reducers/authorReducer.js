import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      // this one would create a new array with the elements in state and then append the contents of the author object
      // [...state, {...action.author}]
      return action.authors;
    default:
      return state;
  }
}
