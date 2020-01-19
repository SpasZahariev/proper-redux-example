import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage(props) {
  const {
    courses,
    authors,
    loadCourses,
    loadAuthors,
    saveCourse,
    history
  } = props;
  //using plain React state to store local form data
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("loading courses failed ", error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => alert("error loading authors ", error));
    }
  }, []);

  // this is weird --- name is the actual property name and I use it with [name]
  // if name is the authorId variable then return an int
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevLocalState => ({
      ...prevLocalState,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

//determines what part of the global state is passed in the props to this component
//request exactly the data this component needs - AND NO MORE!
//this component will rerender every time they change
function mapStateToProps(state) {
  return {
    // courses: state.courses,
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

// can also make it an object with variables that hold as a value an action creator => connect will take care of the rest
// return {createCourse: courseActions.createCourse }
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);