import {combineReducers} from "redux";
import {editorReducer} from "./reducers"

const appReducers = combineReducers({
    editor: editorReducer
});
export default appReducers;
