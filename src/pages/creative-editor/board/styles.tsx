import {makeStyles} from "@material-ui/core/styles";
import {green, red} from "@material-ui/core/colors";

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "100vh",
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
        position: "relative",
        backgroundColor: "#456456",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        // overflow: "auto",
        overflowX: "scroll",
        overflowY:"scroll",
        width: "100%",
        height: "100%",
        margin: "1%",
        position: "relative",
    },
    content: {
        flex: 1,
        width: "100%",
        display: "flex",
        overflow: "hidden",
        position: "absolute",
        justifyContent: "center",
        backgroundColor: "#776677"
    },
    contentItemStyle: {
        backgroundColor: green.A100,
        width: "10vw",
        height: "10vh"
    },
    contentTextStyle: {
        width: "100%",
        height: "100%"
    },
    stageStyle: {
        justifySelf: "center",
        alignSelf: "center",
        backgroundColor: "#009988",
        borderWidth: "3px",
        borderColor: "#000",
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
        margin: "0%",
        marginTop: "10%",
        marginRight: "10%"
    };

    if (menuOption === 1) {
        // styles.paddingBottom = "36.25%"
        styles.width = "1080px";
        styles.height = "1200px";
        styles.margin = "20%";
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
