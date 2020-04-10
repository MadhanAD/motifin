import React from "react";
import {useStyles} from "./styles";
import { LeftPanelComponent } from "./left-panel/LeftPanelComponent";
import { BoardComponent } from "./board/BoardComponent";
import { RightPanelComponent } from "./right-panel/RightPanelComponent";


const CreativeEditorPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.rootContainer}>
            <div className={classes.leftPanelContainer}>
                <LeftPanelComponent/>
            </div>
            <div className={classes.boardContainer}>
                <BoardComponent/>
            </div>
            <div className={classes.rightPanelContainer}>
                <RightPanelComponent/>
            </div>
        </div>
    )
};

export default CreativeEditorPage
