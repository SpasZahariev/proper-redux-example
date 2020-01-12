import { combineReducers } from "redux";
// since in courseReducer we do an export default for the functio0n courseReducer
// we can call it courses or anything when we import that file
import courses from "./courseReducer";

const rootReducer = combineReducers({
  courses: courses
});

export default rootReducer;
