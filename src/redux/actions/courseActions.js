import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import * as authorApi from "../../api/authorApi";

// this function is called an Action Creator
export function createCourse(course) {
  // CREATE_COURSE is the action's type
  return { type: types.CREATE_COURSE, course: course };
  //   object shorthand sintax sugar
  //   return { type: "CREATE_COURSE", course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadCourses() {
  //this returned function is "utilized by the thunk middleware -> it calls it an passes dispatch"
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        //now dispatch an action
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadAuthors() {
  return function(dispatch) {
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors)).catch(error => {
        throw error;
      });
    });
  };
}
