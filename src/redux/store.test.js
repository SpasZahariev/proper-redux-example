import { createStore } from "redux";
import rootReducer from "./reducers/index";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", () => {
  //setup
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Spas' course"
  };

  //execute
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  //verify
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
