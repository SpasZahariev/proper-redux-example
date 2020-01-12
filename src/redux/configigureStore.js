import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
//warns us if we mutate state in the redux store
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const composeEnchancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev-tools
  return createStore(
    rootReducer,
    initialState,
    composeEnchancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
