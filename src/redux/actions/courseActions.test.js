import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

//Test async action configureation
const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe("Async Actions", () => {
  //to make sure that each test has a new fetchMock
  afterEach(() => fetchMock.restore());

  describe("Load Courses Thunk", () => {
    it("should create a BEGIN_API_CALL and a LOAD_COURSES_SUCCESS action when loading courses", () => {
      //configures fetchmock to return this json for ALL requests
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application-json" }
      });

      const expectedActions = [
        {
          type: types.BEGIN_API_CALL
        },
        {
          type: types.LOAD_COURSES_SUCCESS,
          courses: courses
        }
      ];

      const store = mockStore({ courses: [] });

      //execute and verify
      return store.dispatch(courseActions.loadCourses()).then(() => {
        //store getActions returns all the actions fired off until now
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //setup
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course: course
    };

    //execute
    const action = courseActions.createCourseSuccess(course);

    //verify
    expect(action).toEqual(expectedAction);
  });
});
