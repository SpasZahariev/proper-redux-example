// when the app starts this state is an empty []
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE":
      // whatever is returned from this becomes the new state for the reducer
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
