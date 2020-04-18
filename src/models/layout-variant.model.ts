export interface LayoutVariantModel {
    id: string
    title: string;
    sizeList: LayoutVariantSize[];
}

export interface LayoutVariantSize {
    id: string;
    title: string;
    width: number;
    height: number;
}
