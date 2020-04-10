export interface LayerModel {
    id?: string;
    type: LayerType;
    action: LayerAction;
    addIndex?: number;
    removeIndex?: number;
    layerText?: string;
    isSelected?: boolean;
}

export enum LayerType {
    NONE,IMAGE,TEXT
}

export enum LayerAction {
    NONE,ADD,REMOVE,RE_ARRANGE,SELECT,DESELECT
}
