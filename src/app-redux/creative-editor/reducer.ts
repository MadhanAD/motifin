import {Actions} from "./actionCreators";
import {LayerModel} from "../../models/LayerModel";
import {ActionType} from "./models/ActionType";
import {BoardState} from "./models/BoardState";
import {Reducer} from "redux";


const initialState: BoardState = {
    layerItemArray: []
};

export const boardReducer: Reducer<BoardState, ActionType<LayerModel>> = (previousState: BoardState = initialState, action: ActionType<LayerModel>) => {
    switch (action.type) {
        case Actions.ADD_LAYER:
            let tempState = {...previousState};
            const array = [...tempState.layerItemArray];
            // array.splice(0, 0, action.data);
            const tempAddArray = array.map((data: LayerModel) => {
                data.isSelected = false;
                return data;
            });
            const tempData = action.data;
            tempData.isSelected = true;
            tempAddArray.push(tempData);
            // array.push(action.data);
            console.log("reducer add ", tempAddArray);
            return {
                layerItemArray: tempAddArray
            };
        case Actions.REMOVE_LAYER:
            const tempRemoveState = {...previousState};
            const tempArray = tempRemoveState.layerItemArray.filter((data, index) => index !== action.data.removeIndex);
            const selectionLayerArray = tempArray.map((data: LayerModel) => {
                data.isSelected = false;
                return data;
            });
            console.log("reducer remove ", selectionLayerArray);
            return {
                layerItemArray: selectionLayerArray
            };
        case Actions.SELECT_LAYER:
            const tempSelectState = {...previousState};
            const tempSelectedArray = tempSelectState.layerItemArray.map((data: LayerModel) => {
                data.isSelected = data.id === action.data.id;
                return data
            });
            return {
                layerItemArray: tempSelectedArray
            };
        case Actions.DESELECT_ALL:
            const tempDeSelectState = {...previousState};
            const tempDeselectedArray = tempDeSelectState.layerItemArray.map((data: LayerModel) => {
                data.isSelected = false;
                return data
            });
            return {
                layerItemArray: tempDeselectedArray
            };
        default:
            return previousState
    }
};
