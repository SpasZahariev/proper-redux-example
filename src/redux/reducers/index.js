import { combineReducers } from "redux";
// since in courseReducer we do an export default for the functio0n courseReducer
// we can call it courses or anything when we import that file
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer
});

export default rootReducer;
