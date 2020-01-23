import React from "react";
import renderer from "react-test-renderer";
import { authors, courses } from "../../../tools/mockData";
import CourseForm from "./CourseForm";

it("sets submit button label to 'Saving...' when saving prop is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={true}
    ></CourseForm>
  );

  //snapshots are the output of the component rendering
  //they are stored in the _snapshots_ folder when the test is run
  expect(true).toMatchSnapshot();
});

it("sets submit button label to 'Save' when saving prop is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    ></CourseForm>
  );

  expect(true).toMatchSnapshot();
});
