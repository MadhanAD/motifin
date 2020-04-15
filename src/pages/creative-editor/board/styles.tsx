import {makeStyles} from "@material-ui/core/styles";
import {LayoutVariantSize} from "../../../models/layout-variant.model";

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "100vh",
        width: "70vw"
    },
    headerContainer: {
        flex: 1,
        backgroundColor: "#009900",
        display: "flex",
        flexDirection: "row",
    },
    headerFormContainer: {
        flex: 4.5
    },
    headerButton: {
        flex: 1
    },
    bodyContainer: {
        flex: 8,
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflowX: "scroll",
        overflowY: "scroll",
        backgroundColor: "#ecd893",
    },
    contentContainer: {
        backgroundColor: "#62218e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    stageStyle: {
        backgroundColor: "#997766"
    },
    layerStyle: {
        backgroundColor: "#a05a5a"
    },
    footerContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "5%",
        backgroundColor: "#456789"
    }
});


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
