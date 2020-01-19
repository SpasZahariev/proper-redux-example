import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, cActions, aActions } = this.props;
    //only call api when we have no data
    if (courses.length === 0) {
      cActions.loadCourses().catch(error => {
        alert("loading courses failed ", error);
      });
    }
    if (authors.length === 0) {
      aActions
        .loadAuthors()
        .catch(error => alert("error loading authors ", error));
    }
  }

  // handleChange = event => {
  //   //check this out
  //   //we clone state.course and assign a new title to the cloned one
  //   const course = { ...this.state.course, title: event.target.value };
  //   //IMPORTANT: the "this" context refers to the context of the thing that called this function.
  //   //  That is a no no -> we want the "this" context of the CoursePage object
  //   // we need to bind the "this" context
  //   this.setState({ course: course });
  //   //can also be this way since they match
  //   // this.setState({ course});
  // };

  // handleSubmit = event => {
  //   // prevent form from refreshing page
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  // };

  render() {
    return (
      // if onSubmit is assigned in the form and not on a button => you can submit by pressing enter too!
      <>
        {/* lol righthand side only evaluates if left hand side is true !!! */}
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottm: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses}></CourseList>
        {/* {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))} */}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  cActions: PropTypes.object.isRequired,
  aActions: PropTypes.object.isRequired
};

//determines what part of the global state is passed in the props to this component
//request exactly the data this component needs - AND NO MORE!
//this component will rerender every time they change
function mapStateToProps(state) {
  return {
    // courses: state.courses,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

// can also make it an object with variables that hold as a value an action creator => connect will take care of the rest
// return {createCourse: courseActions.createCourse }
function mapDispatchToProps(dispatch) {
  return {
    cActions: bindActionCreators(courseActions, dispatch),
    aActions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
