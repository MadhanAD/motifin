import {LayoutVariantSize} from "../../../models/layout-variant.model";
import {GlobalColors} from "../../../utility/GlobalColors";
import {GlobalStyle} from "../../../utility/GlobalStyle";

export const styles = {
    rootContainer: {
        backgroundColor: GlobalColors.deepPurple500,
        ...GlobalStyle.noSpace,
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
