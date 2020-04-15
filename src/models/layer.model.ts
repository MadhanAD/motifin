export interface LayerModel {
    id?: string;
    type: LayerType;
    action: LayerAction;
    addIndex?: number;
    removeIndex?: number;
    layerText?: string;
    isSelected?: boolean;
    layerOptions?: LayerImageOptions | LayerTextOptions;
}

export enum LayerType {
    NONE, IMAGE, TEXT
}

export enum LayerAction {
    NONE, ADD, REMOVE, RE_ARRANGE, SELECT, DESELECT
}

export interface LayerImageOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    imageUrl: string;
    isSelected?: boolean;
}

export interface LayerTextOptions {
    x?: number;
    y?: number;
    text: string;
    fontSize: number;
    fontColor: string;
    isSelected?: boolean;
}
