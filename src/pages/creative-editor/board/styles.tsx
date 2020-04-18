import {LayoutVariantSize} from "../../../models/layout-variant.model";

export const styles = {
    rootContainer: {

    }
}


export const dynamicStyleForBoard = (layoutVariantSize: LayoutVariantSize) => {
    return {
        width: `${layoutVariantSize.width}px`,
        height: `${layoutVariantSize.height}px`,
        backgroundColor: "#fff",
    };
};

export const getTransformedStyle = (value: number, x: number, y: number) => {
    return {
        transform: `scale(0.4)`,
        positionX: x,
        positionY: y
    }
}
