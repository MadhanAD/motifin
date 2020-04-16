import {LayerModel} from "../../models/layer.model";

export const Actions = {
    ADD_LAYER: "add_layer",
    REMOVE_LAYER: "remove_layer",
    SELECT_LAYER: "select_layer",
    DESELECT_ALL: "deselect_layer",
    UPDATE_LAYER: "update_layer"
};

export const addLayerAction = (data: LayerModel) => {
    return {
        type: Actions.ADD_LAYER,
        data
    }
};

export const removeLayerAction = (data: LayerModel) => {
    return {
        type: Actions.REMOVE_LAYER,
        data
    }
};

export const selectLayerAction = (data: LayerModel) => {
    return {
        type: Actions.SELECT_LAYER,
        data
    }
};

export const deselectLayerAction = () => {
    return {
        type: Actions.DESELECT_ALL
    }
};

export const updateLayerAction = (data: LayerModel) => {
    return {
        type: Actions.UPDATE_LAYER,
        data
    }
}
