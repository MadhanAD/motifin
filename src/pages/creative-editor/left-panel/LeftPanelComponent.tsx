import React, {useState} from "react";
import {useStyles} from "./styles";
import {Button, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff"

import {LayerAction, LayerModel, LayerType} from "../../../models/LayerModel";
import {LeftPanelProps} from "../Props";
import {useDispatch} from "react-redux";
import {addLayerAction, removeLayerAction, selectLayerAction} from "../../../app-redux/creative-editor/actionCreators";

const Uuid = require("uuid");

export const LeftPanelComponent = (props: LeftPanelProps) => {

    const [layerType, setLayerType] = useState<LayerType>(LayerType.IMAGE);
    const [layerArray, setLayerArray] = useState<LayerModel[]>([]);
    const classes = useStyles();

    const dispatch = useDispatch();

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
                        console.log("layer selection ", layerType);
                    }}>
                        <MenuItem value={LayerType.IMAGE}>Image</MenuItem>
                        <MenuItem value={LayerType.TEXT}>Text</MenuItem>
                    </Select>
                </FormControl>
                <Button color={"primary"} variant={"contained"}
                        onClick={() => {
                            const layerModel: LayerModel = {type: layerType, action: LayerAction.ADD};
                            const tempLayerArray = [...layerArray];
                            if (layerType === LayerType.IMAGE) {
                                layerModel.id = Uuid.v4();
                                layerModel.layerText = "Image Layer";
                                layerModel.addIndex = tempLayerArray.length + 1;
                                // tempLayerArray.splice(0,0,layerModel);
                                tempLayerArray.push(layerModel);
                            } else if (layerType === LayerType.TEXT) {
                                layerModel.id = Uuid.v4();
                                layerModel.layerText = "Text Layer";
                                layerModel.addIndex = tempLayerArray.length + 1;
                                // tempLayerArray.splice(0,0,layerModel);
                                tempLayerArray.push(layerModel);
                            }
                            setLayerArray(tempLayerArray);
                            const layerModelAction = addLayerAction(layerModel);
                            console.log("add called");
                            dispatch(layerModelAction);
                            // props.layerModelCallback(layerModel)
                        }}>Add</Button>
            </div>
            <div className={classes.listContainer}>
                <List className={classes.listContentContainer}>
                    {
                        layerArray.map((data, index) => {
                                return (<ListItem className={classes.listItemContainer} key={`${index}`}
                                                  onClick={() => {
                                                      dispatch(selectLayerAction(data))
                                                  }}
                                >
                                    <ListItemText primary={data.layerText}/>
                                    <HighlightOffIcon onClick={() => {
                                        const tempArray = layerArray.filter((data, position) => position !== index);
                                        setLayerArray(tempArray);
                                        const layerModel: LayerModel = {type: layerType, action: LayerAction.REMOVE};
                                        layerModel.removeIndex = index;
                                        const layerModelAction = removeLayerAction(layerModel);
                                        dispatch(layerModelAction);
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
