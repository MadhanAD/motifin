import {Action} from "redux";

export interface ActionType<T> extends Action{
    type: string,
    data: T
}
