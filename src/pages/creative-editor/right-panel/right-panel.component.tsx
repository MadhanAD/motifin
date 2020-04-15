import React from "react";
import {useStyles} from "./styles";
import TextOptionsComponent from "../../../components/TextOptions/text-options.component";
import {LayerModel, LayerTextOptions} from "../../../models/layer.model";

export interface RightPanelProps {
    layerModel: LayerModel | null;
}

export const RightPanelComponent = (props: RightPanelProps) => {
    const classes = useStyles();
    return (
        <div className={classes.rootContainer}>
            {
                props.layerModel ? (
                    <TextOptionsComponent data={props.layerModel.layerOptions as LayerTextOptions}/>) : null
            }

        </div>
    )
};
