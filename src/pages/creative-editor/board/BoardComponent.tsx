import React, {useRef, useState} from "react";
import {dynamicStyleForBoard, getZoomedLayout, useStyles} from "./styles";
import {BoardProps} from "../Props";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../app-redux/AppState";
import {LayerAction, LayerModel, LayerType} from "../../../models/LayerModel";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Layer, Stage} from "react-konva";
import demo1Img from "../../../assets/demo1.jpg";
import TextComponent, {TextProps} from "../../../components/TextComponent";
import Konva from "konva";
import ImageComponent, {ImageProps} from "../../../components/ImageComponent";
import {deselectLayerAction, selectLayerAction} from "../../../app-redux/creative-editor/actionCreators";
import {KonvaEventObject} from "konva/types/Node";

export const BoardComponent = (props: BoardProps) => {

    const dispatch = useDispatch();

    let canvasRef = useRef<Stage>(null);
    let layerRef = useRef<Konva.Layer>(null);

    const [stageWidth, setStageWidth] = useState(800);
    const [stageHeight, setStageHeight] = useState(800);
    const [zoom, setZoom] = useState<number>(40);
    const [stageScale, setStageScale] = useState<number>(1);
    const [stageScaleX, setStageScaleX] = useState<number>(0);
    const [stageScaleY, setStageScaleY] = useState<number>(0);

    const classes = useStyles();
    const [layerMenuOption, setLayerMenuOption] = useState(1);
    const {layerModelArray} = useSelector<AppState, BoardProps>(state => {

        const boardProps: BoardProps = {
            layerModelArray: state.board.layerItemArray
        };
        return boardProps;
    });

    function downloadURI(uri: any, name: any) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
    }

    const zoomClick = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.02;
        const stage = e.target.getStage();
        const oldScale = stage?.scaleX();
        const mousePointTo = {
            // @ts-ignore
            x: stage?.getPointerPosition()?.x / oldScale - stage?.x() / oldScale,
            // @ts-ignore
            y: stage?.getPointerPosition()?.y / oldScale - stage?.y() / oldScale
        };
        // @ts-ignore
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setStageScale(newScale);
        // @ts-ignore
        setStageScaleX(-(mousePointTo.x - stage?.getPointerPosition()?.x / newScale) * newScale)
        // @ts-ignore
        setStageScaleY(-(mousePointTo.y - stage?.getPointerPosition()?.y / newScale) * newScale)
    }

    return (
        <div className={classes.rootContainer}>
            <div className={classes.headerContainer}>
                <FormControl className={classes.headerFormContainer}>
                    <InputLabel>Select type</InputLabel>
                    <Select defaultValue={1}>
                        <MenuItem value={1}>Facebook</MenuItem>
                        <MenuItem value={2}>Instagram</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.headerFormContainer}>
                    <InputLabel>Select layout</InputLabel>
                    <Select defaultValue={1} onChange={(value) => {
                        const menuValue = Number(value.target.value)
                        setLayerMenuOption(menuValue);
                        if (menuValue === 1) {
                            setStageWidth(1080);
                            setStageHeight(1200)
                        } else {
                            setStageWidth(400);
                            setStageHeight(400);
                        }
                        // updateStageWidth()
                    }}>
                        <MenuItem value={1}>1080 * 1200</MenuItem>
                        <MenuItem value={2}>800 * 800</MenuItem>
                    </Select>
                </FormControl>

                <Button className={classes.headerButton} color={"primary"} variant={"contained"}>Load</Button>
                <Button className={classes.headerButton}
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => {
                            if (zoom > 25) {
                                const temp = zoom - 25
                                setZoom(temp);
                            }
                        }}
                >-</Button>
                <label className={classes.headerButton} color={"primary"}>{zoom}</label>
                <Button className={classes.headerButton}
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => {
                            if (zoom <= 100) {
                                const temp = zoom + 25;
                                setZoom(temp);
                            }
                        }}
                >+</Button>
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.contentContainer}
                     style={dynamicStyleForBoard(layerMenuOption)}>
                    <Stage
                        // style={getZoomedLayout(zoom)}
                        ref={canvasRef}
                        width={stageWidth}
                        height={stageHeight}
                        scaleX={stageScale}
                        scaleY={stageScale}
                        x={stageScaleX}
                        y={stageScaleY}
                        onWheel={zoomClick}
                        onMouseDown={event => {
                            const clickedOnEmpty = event.target === event.target.getStage()
                            if (clickedOnEmpty) {
                                // deselect all element
                                dispatch(deselectLayerAction());
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
                                layerModelArray?.map((data: LayerModel) => {
                                    if (data.type === LayerType.IMAGE) {
                                        return (
                                            <ImageComponent
                                                key={data.id}
                                                shape={{x: 50, y: 50}}
                                                imagePath={demo1Img}
                                                isSelected={data.isSelected}
                                                onSelect={(data: ImageProps) => {
                                                    // calls only on select
                                                    const layerModel: LayerModel = {
                                                        id: data.id,
                                                        action: LayerAction.SELECT,
                                                        type: LayerType.IMAGE
                                                    };
                                                    dispatch(selectLayerAction(layerModel))
                                                }}
                                                onChange={(data) => {
                                                }}/>
                                        )
                                    } else if (data.type === LayerType.TEXT) {
                                        return (
                                            <TextComponent
                                                x={50}
                                                y={50}
                                                id={data.id}
                                                text={"Text from board props"}
                                                isSelected={data.isSelected}
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
