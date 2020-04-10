import {combineReducers} from "redux";
import {boardReducer} from "./reducers"

const appReducers = combineReducers({
    board: boardReducer
});
export default appReducers;
