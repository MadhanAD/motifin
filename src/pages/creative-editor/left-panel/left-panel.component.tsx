import React, {useState} from "react";
import {useStyles} from "./styles";
import {Button, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import demo1Img from "../../../assets/demo1.jpg";

import {LayerAction, LayerModel, LayerType} from "../../../models/layer.model";
const Uuid = require("uuid");


export interface LeftPanelProps {
    layerModelCallback: (arg: LayerModel) => void;
    layerModelArray: LayerModel[]
}


export const LeftPanelComponent = (props: LeftPanelProps) => {

    const [layerType, setLayerType] = useState<LayerType>(LayerType.IMAGE);
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <div className={classes.titleContainer}>
                <h5>Add Layer</h5>
            </div>
            <div className={classes.formContainer}>
                <FormControl>
                    <InputLabel>Select Layer type</InputLabel>
                    <Select defaultValue={LayerType.IMAGE} onChange={(value) => {

                        if (value.target.value === 1) {
                            setLayerType(LayerType.IMAGE);
                        } else if (value.target.value === 2) {
                            setLayerType(LayerType.TEXT);
                        } else {
                            setLayerType(LayerType.NONE);
                        }
                    }}>
                        <MenuItem value={LayerType.IMAGE}>Image</MenuItem>
                        <MenuItem value={LayerType.TEXT}>Text</MenuItem>
                    </Select>
                </FormControl>
                <Button color={"primary"} variant={"contained"}
                        onClick={() => {
                            const layerModel: LayerModel = {type: layerType, action: LayerAction.ADD};
                            if (layerType === LayerType.IMAGE) {
                                layerModel.id = Uuid.v4();
                                layerModel.layerText = "Image Layer";
                                layerModel.addIndex = props.layerModelArray.length + 1;
                                layerModel.layerOptions = {
                                    x: 50,
                                    y: 50,
                                    imageUrl: demo1Img
                                };
                            } else if (layerType === LayerType.TEXT) {
                                layerModel.id = Uuid.v4();
                                layerModel.layerText = "Text Layer";
                                layerModel.addIndex = props.layerModelArray.length + 1;
                                layerModel.layerOptions = {
                                    x: 50,
                                    y: 75,
                                    fontColor: "#000",
                                    fontSize: 15,
                                    text: "Replace this Text"
                                };
                            }
                            props.layerModelCallback(layerModel)
                        }}>Add</Button>
            </div>
            <div className={classes.listContainer}>
                <List className={classes.listContentContainer}>
                    {
                        props.layerModelArray.map((data, index) => {
                                return (<ListItem className={classes.listItemContainer} key={`${index}`}
                                                  onClick={() => {
                                                      data.action = LayerAction.SELECT
                                                      props.layerModelCallback(data)
                                                  }}>
                                    <ListItemText primary={data.layerText}/>
                                    <HighlightOffIcon onClick={() => {
                                        const layerModel: LayerModel = {type: layerType, action: LayerAction.REMOVE};
                                        layerModel.removeIndex = index;
                                        props.layerModelCallback(layerModel)
                                    }}/>
                                </ListItem>)
                            }
                        )
                    }
                </List>
            </div>
        </div>
    )
};
