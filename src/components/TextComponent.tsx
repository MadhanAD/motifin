import {Stage, Text, Transformer} from "react-konva";
import {Layer} from "konva/types/Layer";
import Konva from "konva";
import React, {Fragment, useRef} from "react";

const Uuid = require("uuid");

export interface TextProps {
    id?: string;
    text?: string;
    x?: number;
    y?: number;
    isSelected?: boolean;
}

const TextComponent = (props: TextProps) => {
    const textRef = useRef<Konva.Text>(null);
    return (
        <Fragment key={props.id}>
            <Text
                x={props.x}
                y={props.y}
                ref={textRef}
                key={props.id}
                id={props.id}
                text={props.text}
                draggable={true}
                onDragEnd={e => {

                }}
                onTransformEnd={e => {

                }}
            />
            {
                props.isSelected && (
                    <Transformer ref={(node) => {
                        if (props.isSelected) {
                            node?.setNode(textRef.current);
                            node?.getLayer()?.batchDraw();
                        }
                    }}/>
                )
            }
        </Fragment>

    )
};


export default TextComponent
