import {Text, Transformer} from "react-konva";
import Konva from "konva";
import React, {Fragment, useRef} from "react";
import {LayerTextOptions} from "../models/layer.model";

export interface TextProps {
    id?: string;
    data: LayerTextOptions;
}

const CustomTextComponent = (props: TextProps) => {
    const textRef = useRef<Konva.Text>(null);
    return (
        <Fragment key={props.id}>
            <Text
                x={props.data.x}
                y={props.data.y}
                ref={textRef}
                key={props.id}
                id={props.id}
                text={props.data.text}
                fontSize={props.data.fontSize}
                fill={props.data.fontColor}
                draggable={true}
                onDragEnd={e => {

                }}
                onTransformEnd={e => {

                }}
            />
            {
                props.data.isSelected && (
                    <Transformer ref={(node) => {
                        if (props.data.isSelected) {
                            node?.setNode(textRef.current);
                            node?.getLayer()?.batchDraw();
                        }
                    }}/>
                )
            }
        </Fragment>
    )
};

export default CustomTextComponent
