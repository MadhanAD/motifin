import React, {useRef, useState} from "react";
import {dynamicStyleForBoard, getTransformedStyle, useStyles} from "./styles";
import {LayerAction, LayerImageOptions, LayerModel, LayerTextOptions, LayerType} from "../../../models/layer.model";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Layer, Stage} from "react-konva";

import CustomTextComponent from "../../../components/custom-text.component";
import Konva from "konva";
import CustomImageComponent, {ImageProps} from "../../../components/custom-image.component";
import {LayoutVariantModel, LayoutVariantSize} from "../../../models/layout-variant.model";

export interface BoardProps {
    layerModelArray: LayerModel[];
    layoutVariantArray: LayoutVariantModel[];
    onSelectLayer: (arg: LayerModel) => void;
    onDeselectLayer: () => void;
}


export const BoardComponent = (props: BoardProps) => {

    let canvasRef = useRef<Stage>(null);
    let layerRef = useRef<Konva.Layer>(null);

    const [selectedLayoutVariantArray, setSelectedLayoutVariantArray] = useState<LayoutVariantSize[]>(props.layoutVariantArray[0].sizeList)
    const [selectedLayoutVariant, setSelectedLayoutVariant] = useState<LayoutVariantSize>(selectedLayoutVariantArray[0]);

    const [zoom, setZoom] = useState<number>(1);
    const [stageScale, setStageScale] = useState<number>(1);
    const [stageScaleX, setStageScaleX] = useState<number>(0);
    const [stageScaleY, setStageScaleY] = useState<number>(0);

    const classes = useStyles();

    function downloadURI(uri: any, name: any) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
    }

    return (
        <div className={classes.rootContainer}>
            <div className={classes.headerContainer}>
                <FormControl className={classes.headerFormContainer}>
                    <InputLabel>Select type</InputLabel>
                    <Select defaultValue={1} onChange={(event) => {
                        const layoutVariant = props.layoutVariantArray.find((data: LayoutVariantModel) => data.id === event.target.value)
                        setSelectedLayoutVariantArray(layoutVariant ? layoutVariant.sizeList : []);
                    }}>
                        {props.layoutVariantArray.map(data => {
                            return (<MenuItem value={data.id}>{data.title}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.headerFormContainer}>
                    <InputLabel>Select layout</InputLabel>
                    <Select defaultValue={1} onChange={(value) => {
                        const menuValue = Number(value.target.value)
                        const selectedMenu = selectedLayoutVariantArray.find((data: LayoutVariantSize) => data.id === menuValue)
                        if (selectedMenu) {
                            setSelectedLayoutVariant(selectedMenu)
                        }
                    }}>
                        {
                            selectedLayoutVariantArray.map(data => {
                                return (<MenuItem value={data.id}>{data.title}</MenuItem>)
                            })
                        }
                    </Select>
                </FormControl>

                <Button className={classes.headerButton} color={"primary"} variant={"contained"}>Load</Button>
                <Button className={classes.headerButton}
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => {
                            if (zoom > 0.4) {
                                const temp = zoom - 0.2
                                setZoom(temp);
                            }
                        }}
                >-</Button>
                <label className={classes.headerButton} color={"primary"}>{zoom}</label>
                <Button className={classes.headerButton}
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => {
                            if (zoom < 1) {
                                const temp = zoom + 0.2;
                                setZoom(temp);
                            }
                        }}
                >+</Button>
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.contentContainer}
                     style={{
                         ...dynamicStyleForBoard(selectedLayoutVariant),
                         ...getTransformedStyle(zoom, selectedLayoutVariant.width / 2, selectedLayoutVariant.height / 2)
                     }}>

                    <Stage ref={canvasRef}
                           width={selectedLayoutVariant.width}
                           height={selectedLayoutVariant.height}
                           scaleX={stageScale}
                           scaleY={stageScale}
                           x={stageScaleX}
                           y={stageScaleY}
                           onMouseDown={event => {
                               const clickedOnEmpty = event.target === event.target.getStage()
                               if (clickedOnEmpty) {
                                   // deselect all element
                                   props.onDeselectLayer()
                               }
                           }}
                    >
                        <Layer
                            className={classes.layerStyle}
                            x={0}
                            y={0}
                            ref={layerRef}
                            width={400}
                            height={400}
                        >
                            {
                                props.layerModelArray?.map((data: LayerModel) => {
                                    if (data.type === LayerType.IMAGE) {
                                        return (
                                            <CustomImageComponent
                                                key={data.id}
                                                data={data.layerOptions as LayerImageOptions}
                                                onSelect={(data: ImageProps) => {
                                                    // calls only on select
                                                    const layerModel: LayerModel = {
                                                        id: data.id,
                                                        action: LayerAction.SELECT,
                                                        type: LayerType.IMAGE
                                                    };
                                                    props.onSelectLayer(layerModel)
                                                }}
                                                onChange={(data) => {
                                                }}/>
                                        )
                                    } else if (data.type === LayerType.TEXT) {
                                        return (
                                            <CustomTextComponent
                                                data={data.layerOptions as LayerTextOptions}
                                                id={data.id}
                                            />
                                        )
                                    }
                                })
                            }
                        </Layer>
                    </Stage>

                </div>
            </div>
            <div className={classes.footerContainer}>
                <Button color={"secondary"} variant={"contained"}>Cancel</Button>
                <Button color={"primary"} variant={"contained"} onClick={() => {
                    if (canvasRef.current !== null) {
                        const stage = canvasRef.current.getStage();

                        const stageUrl = stage.toDataURL({
                            pixelRatio: 1,
                        });
                        console.log(stage.toJSON())
                        downloadURI(stageUrl, "z-index.png");
                    }
                }}>Save</Button>
            </div>
        </div>
    )
};
