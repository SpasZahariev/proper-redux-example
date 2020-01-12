// this function is called an Action Creator
export function createCourse(course) {
  // CREATE_COURSE is the action's type
  return { type: "CREATE_COURSE", course: course };
  //   object shorthand sintax sugar
  //   return { type: "CREATE_COURSE", course };
}
