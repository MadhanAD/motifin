import React from "react";
import {useStyles} from "./styles";

export const RightPanelComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.rootContainer}>
            <h2>Right panel</h2>
        </div>
    )
};
