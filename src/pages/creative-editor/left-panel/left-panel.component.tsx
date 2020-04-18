import React, {FormEvent, useState} from "react";
import {styles} from './styles'
import demo1Img from "../../../assets/demo1.jpg";

import {LayerAction, LayerModel, LayerType} from "../../../models/layer.model";
import {Button, Col, Container, FormControl, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {GlobalStyle} from "../../../utility/GlobalStyle";

import {Icons} from "../../../components/Icons";
import {GlobalColors} from "../../../utility/GlobalColors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {} from 'react-bootstrap-icon';
import {faDrum, faMinus, faTimes} from "@fortawesome/free-solid-svg-icons"

const Uuid = require("uuid");


export interface LeftPanelProps {
    layerModelCallback: (arg: LayerModel) => void;
    layerModelArray: LayerModel[]
}


export const LeftPanelComponent = (props: LeftPanelProps) => {

    const [layerType, setLayerType] = useState<LayerType>(LayerType.IMAGE);

    const render = (
        <Container fluid style={styles.rootContainer}>
            <Col style={{...GlobalStyle.noSpace}}>
                <h5>Add Layer</h5>
                <FormControl as="select" onChange={(event: FormEvent<HTMLInputElement>) => {
                    const value = event.currentTarget.value
                    if (value === LayerType.IMAGE.toString()) {
                        setLayerType(LayerType.IMAGE);
                    } else if (value === LayerType.TEXT.toString()) {
                        setLayerType(LayerType.TEXT);
                    } else {
                        setLayerType(LayerType.NONE);
                    }
                }}>
                    <option value={LayerType.IMAGE}>Image</option>
                    <option value={LayerType.TEXT}>Text</option>
                </FormControl>
                <Button onClick={() => {
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
                }}>Add Layer</Button>
                <ListGroup>
                    {
                        props.layerModelArray.map((data, index) => {
                                return (
                                    <ListGroupItem key={`${index}`}
                                                   style={styles.listItemContainer }
                                                   onClick={() => {
                                                       data.action = LayerAction.SELECT
                                                       props.layerModelCallback(data)
                                                   }}>

                                        {data.layerText}
                                        <FontAwesomeIcon onClick={() => {
                                            const layerModel: LayerModel = {type: layerType, action: LayerAction.REMOVE};
                                            layerModel.removeIndex = index;
                                            props.layerModelCallback(layerModel)
                                        }} icon={faTimes} width={20} height={20}/>
                                    </ListGroupItem>
                                )
                            }
                        )
                    }
                </ListGroup>
            </Col>
        </Container>
    )

    return render;
    // return (
    //     <div className={classes.rootContainer}>
    //         <div className={classes.titleContainer}>
    //             <h5>Add Layer</h5>
    //         </div>
    //         <div className={classes.formContainer}>
    //             <FormControl>
    //                 <InputLabel>Select Layer type</InputLabel>
    //                 <Select defaultValue={LayerType.IMAGE} onChange={(value) => {
    //
    //                     if (value.target.value === 1) {
    //                         setLayerType(LayerType.IMAGE);
    //                     } else if (value.target.value === 2) {
    //                         setLayerType(LayerType.TEXT);
    //                     } else {
    //                         setLayerType(LayerType.NONE);
    //                     }
    //                 }}>
    //                     <MenuItem value={LayerType.IMAGE}>Image</MenuItem>
    //                     <MenuItem value={LayerType.TEXT}>Text</MenuItem>
    //                 </Select>
    //             </FormControl>
    //             <Button color={"primary"} variant={"contained"}
    //                     onClick={() => {
    //                         const layerModel: LayerModel = {type: layerType, action: LayerAction.ADD};
    //                         if (layerType === LayerType.IMAGE) {
    //                             layerModel.id = Uuid.v4();
    //                             layerModel.layerText = "Image Layer";
    //                             layerModel.addIndex = props.layerModelArray.length + 1;
    //                             layerModel.layerOptions = {
    //                                 x: 50,
    //                                 y: 50,
    //                                 imageUrl: demo1Img
    //                             };
    //                         } else if (layerType === LayerType.TEXT) {
    //                             layerModel.id = Uuid.v4();
    //                             layerModel.layerText = "Text Layer";
    //                             layerModel.addIndex = props.layerModelArray.length + 1;
    //                             layerModel.layerOptions = {
    //                                 x: 50,
    //                                 y: 75,
    //                                 fontColor: "#000",
    //                                 fontSize: 15,
    //                                 text: "Replace this Text"
    //                             };
    //                         }
    //                         props.layerModelCallback(layerModel)
    //                     }}>Add</Button>
    //         </div>
    //         <div className={classes.listContainer}>
    //             <List className={classes.listContentContainer}>
    //                 {
    //                     props.layerModelArray.map((data, index) => {
    //                             return (<ListItem className={classes.listItemContainer} key={`${index}`}
    //                                               onClick={() => {
    //                                                   data.action = LayerAction.SELECT
    //                                                   props.layerModelCallback(data)
    //                                               }}>
    //                                 <ListItemText primary={data.layerText}/>
    //                                 <HighlightOffIcon onClick={() => {
    //                                     const layerModel: LayerModel = {type: layerType, action: LayerAction.REMOVE};
    //                                     layerModel.removeIndex = index;
    //                                     props.layerModelCallback(layerModel)
    //                                 }}/>
    //                             </ListItem>)
    //                         }
    //                     )
    //                 }
    //             </List>
    //         </div>
    //     </div>
    // )
};
