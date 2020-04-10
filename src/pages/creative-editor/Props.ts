import {LayerModel} from "../../models/LayerModel";

export interface LeftPanelProps {
    layerModelCallback?: (arg: LayerModel) => void
}

export interface BoardProps {
    layerModelArray?: LayerModel[];
}
