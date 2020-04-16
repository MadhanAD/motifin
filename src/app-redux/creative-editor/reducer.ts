import {Actions} from "./actionCreators";
import {LayerModel} from "../../models/layer.model";
import {ActionType} from "../utils/ActionType";
import {EditorState} from "./state/EditorState";


const initialState: EditorState = {
    layerModelArray: [],
    selectedLayerModel: null
};

export const editorReducer: (previousState: EditorState, action: ActionType<LayerModel>) => ({ layerModelArray: LayerModel[] })
    = (previousState: EditorState = initialState, action: ActionType<LayerModel>) => {
    switch (action.type) {
        case Actions.ADD_LAYER:
            let tempState = {...previousState};
            const array = [...tempState.layerModelArray];
            const tempAddArray = array.map((data: LayerModel) => {
                data.isSelected = false;
                if (data.layerOptions) data.layerOptions.isSelected = false;
                return data;
            });
            const tempData = action.data;
            tempData.isSelected = true;
            if (tempData.layerOptions) tempData.layerOptions.isSelected = true;
            tempAddArray.push(tempData);
            return {
                layerModelArray: tempAddArray,
                selectedLayerModel: tempData
            };
        case Actions.REMOVE_LAYER:
            const tempRemoveState = {...previousState};
            const tempArray = tempRemoveState.layerModelArray.filter((data, index) => index !== action.data.removeIndex);
            const selectionLayerArray = tempArray.map((data: LayerModel) => {
                data.isSelected = false;
                if (data.layerOptions) data.layerOptions.isSelected = false;
                return data;
            });
            return {
                layerModelArray: selectionLayerArray,
                selectedLayerModel: selectionLayerArray.find(element => element.isSelected)
            };
        case Actions.SELECT_LAYER:
            const tempSelectState = {...previousState};
            const tempSelectedArray = tempSelectState.layerModelArray.map((data: LayerModel) => {
                data.isSelected = data.id === action.data.id;
                if (data.layerOptions) data.layerOptions.isSelected = data.isSelected;
                return data
            });
            console.table(tempSelectedArray);
            return {
                layerModelArray: tempSelectedArray,
                selectedLayerModel: tempSelectedArray.find(element => element.isSelected)
            };
        case Actions.DESELECT_ALL:
            const tempDeSelectState = {...previousState};
            const tempDeselectedArray = tempDeSelectState.layerModelArray.map((data: LayerModel) => {
                data.isSelected = false;
                if (data.layerOptions) data.layerOptions.isSelected = false
                return data
            });
            return {
                layerModelArray: tempDeselectedArray,
                selectedLayerModel: null
            };
        case Actions.UPDATE_LAYER:

            const layerModel = action.data
            const tempState1 = {...previousState}
            const tempArray1 = tempState1.layerModelArray.map((data: LayerModel) => {
                return data.id === layerModel.id ? layerModel : data
            })

            return {
                layerModelArray: tempArray1,
                selectedLayerModel: layerModel
            }
        default:
            return previousState
    }
};
