import React from "react";
import {styles} from "./styles";
import TextOptionsComponent from "../../../components/TextOptions/text-options.component";
import {LayerImageOptions, LayerModel, LayerTextOptions, LayerType} from "../../../models/layer.model";
import {Col, Container} from 'react-bootstrap';
import {GlobalStyle} from "../../../utility/GlobalStyle";
import ImageOptionComponent from "../../../components/ImageOptions/image-options.component";

export interface RightPanelProps {
    layerModel: LayerModel | null;
    onLayerUpdateEvent: (model: LayerModel) => void
}

export const RightPanelComponent = (props: RightPanelProps) => {
    return <Container style={styles.rootContainer}>
        <Col style={GlobalStyle.noSpace}>
            <section>
                {
                    props.layerModel?.type === LayerType.TEXT ? (
                        <TextOptionsComponent
                            data={props.layerModel?.layerOptions as LayerTextOptions}
                            onUpdateEvent={(layerOption: LayerTextOptions) => {
                                if (props.layerModel) {
                                    const model: LayerModel = props.layerModel
                                    model.layerOptions = layerOption
                                    props.onLayerUpdateEvent(model)
                                }
                            }}
                        />) : null
                }

                {
                    props.layerModel?.type === LayerType.IMAGE ? (
                        <ImageOptionComponent
                            data={props.layerModel?.layerOptions as LayerImageOptions}
                            onUpdateEvent={(layerOption: LayerImageOptions) => {
                                if (props.layerModel) {
                                    const model: LayerModel = props.layerModel
                                    model.layerOptions = layerOption
                                    props.onLayerUpdateEvent(model)
                                }
                            }}
                        />) : null
                }
            </section>
        </Col>

    </Container>
};
