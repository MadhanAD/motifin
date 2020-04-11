export interface LayoutVariant {
    id: number
    title: string;
    sizeList: LayoutVariantSize[];
}

export interface LayoutVariantSize {
    id: number;
    title: string;
    width: number;
    height: number;
}
