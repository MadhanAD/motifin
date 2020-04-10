import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    rootContainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "row"
    },
    leftPanelContainer: {
        flex: 1.5,
        backgroundColor: "#009988"
    },
    boardContainer: {
        flex: 6.5,
        backgroundColor: "#889900"
    },
    rightPanelContainer: {
        flex: 2,
        backgroundColor: '#112233'
    }
});
