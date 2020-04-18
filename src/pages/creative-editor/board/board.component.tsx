import React, {FormEvent, useRef, useState} from "react";
import {dynamicStyleForBoard, getTransformedStyle, styles} from "./styles";
import {LayerAction, LayerImageOptions, LayerModel, LayerTextOptions, LayerType} from "../../../models/layer.model";
import {Layer, Stage} from "react-konva";

import CustomTextComponent from "../../../components/custom-text.component";
import Konva from "konva";
import CustomImageComponent, {ImageProps} from "../../../components/custom-image.component";
import {LayoutVariantModel, LayoutVariantSize} from "../../../models/layout-variant.model";
import {Col, Container, Row, FormControl, Button} from "react-bootstrap";
import {GlobalColors} from "../../../utility/GlobalColors";
import {GlobalStyle} from "../../../utility/GlobalStyle";

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

    // const [zoom, setZoom] = useState<number>(1);
    const [stageScale, setStageScale] = useState<number>(1);
    const [stageScaleX, setStageScaleX] = useState<number>(0);
    const [stageScaleY, setStageScaleY] = useState<number>(0);

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
        <Container style={styles.rootContainer}>
            <Col sm={12}>
                <Row className="align-content-center"
                     style={{backgroundColor: GlobalColors.deepPurple500, height: "10vh"}}>
                    <Col sm={4}>
                        <FormControl as="select" onChange={(event: FormEvent<HTMLInputElement>) => {
                            const layoutVariant = props.layoutVariantArray.find((data: LayoutVariantModel) => data.id === event.currentTarget.value)
                            setSelectedLayoutVariantArray(layoutVariant ? layoutVariant.sizeList : []);
                        }}>
                            {props.layoutVariantArray.map(data => {
                                return (<option value={data.id}>{data.title}</option>)
                            })}
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <FormControl as="select" onChange={(event: FormEvent<HTMLInputElement>) => {
                            const selectedMenu = selectedLayoutVariantArray.find((data: LayoutVariantSize) => data.id === event.currentTarget.value)
                            if (selectedMenu) {
                                setSelectedLayoutVariant(selectedMenu)
                            }
                        }}>
                            {
                                selectedLayoutVariantArray.map(data => {
                                    return (<option value={data.id}>{data.title}</option>)
                                })
                            }
                        </FormControl>
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary">Load</Button>
                    </Col>
                    <Col sm={1}>
                        <Button variant="success" onClick={() => {
                            if (canvasRef.current !== null) {
                                const stage = canvasRef.current.getStage();

                                const stageUrl = stage.toDataURL({
                                    pixelRatio: 1,
                                });
                                console.log(stage.toJSON())
                                downloadURI(stageUrl, "z-index.png");
                            }
                        }}>Download</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center"
                     style={{backgroundColor: GlobalColors.indigo100, height: "90vh"}}>
                    <div
                        style={{
                            ...dynamicStyleForBoard(selectedLayoutVariant),
                            ...getTransformedStyle(1, selectedLayoutVariant.width / 2, selectedLayoutVariant.height / 2)
                        }}
                    >

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
                </Row>
            </Col>
        </Container>
    );
};
