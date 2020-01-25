import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

//component is aways Mounted
//this testing library focuses on testing what the user sees
afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render the CourseForm", () => {
  //returns an object with functions for querying the html output
  const { getByText } = renderCourseForm();
  //this will search the returned object for the string
  getByText("Add Course");
});

it("should display Save when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should display Saving... when saving", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
