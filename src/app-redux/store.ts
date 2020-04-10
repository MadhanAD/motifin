import {createStore} from "redux";
import appReducers from "./appReducers";

export const store = createStore(appReducers);
