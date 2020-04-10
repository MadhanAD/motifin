import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh"
    },
    titleContainer: {
        flex: 0.5,
    },
    formContainer: {
        flex: 2,
        display: "flex",
        flexDirection: "column"
    },
    listContainer: {
        flex: 7.5
    },
    listItemContainer: {
      cursor: "pointer"
    },
    listContentContainer: {
        height: "71vh",
        width: "100%",
        overflow: "auto"
    }
});
