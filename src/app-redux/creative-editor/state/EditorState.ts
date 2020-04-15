import {LayerModel} from "../../../models/layer.model";

export interface EditorState {
    layerModelArray: LayerModel[];
    selectedLayerModel: LayerModel | null;
}
