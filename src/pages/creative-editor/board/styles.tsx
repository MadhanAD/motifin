import {makeStyles} from "@material-ui/core/styles";
import {green, red} from "@material-ui/core/colors";

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
        flexDirection:"row",
        justifyContent:"center",
        position: "relative",
        overflowX: "scroll",
        overflowY:"scroll",
        backgroundColor: "#ecd893",
    },
    contentContainer: {
        backgroundColor: "#62218e",
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    layerStyle: {
        backgroundColor: "#fff"
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


export const dynamicStyleForBoard = (menuOption: number) => {
    let styles = {
        width: "400px",
        height: "400px",
        backgroundColor: "#fff",
        margin: "0%"
    };

    if (menuOption === 1) {
        // styles.paddingBottom = "36.25%"
        styles.width = "1080px";
        styles.height = "1200px";

    } else if (menuOption === 2) {
        // styles.paddingBottom = "60%"
        styles.width = "400px";
        styles.height = "400px";
        styles.margin = "5%";
    }

    return styles;
};

export const getZoomedLayout = (value: number) => {
    return {
        zoom: `${value}%`
    }
}
