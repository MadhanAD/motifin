import React, {useRef, Fragment} from "react";
import {Image, Transformer} from "react-konva";

export interface ImageProps {
    id?: string;
    shape?: ImageShape;
    imagePath: string;
    isSelected?: boolean;
    onSelect?: (props: ImageProps) => void;
    onChange?: (props: ImageShape) => void;
}

export interface ImageShape {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

const ImageComponent = (props: ImageProps) => {
    // @ts-ignore
    let imageRef = useRef<Image>(new window.Image());
    const imageSrc = new window.Image();
    imageSrc.src = props.imagePath;
    return (
        <Fragment key={props.id}>
            <Image ref={imageRef}
                   x={props?.shape?.x}
                   y={props?.shape?.y}
                   image={imageSrc}
                   draggable={true}
                   onDragEnd={e => {
                   }}
                   onTransformEnd={e => {
                   }}
                   onTap={() => {
                       if (props.onSelect != null) {
                           props.onSelect({...props})
                       }
                   }}
                   onClick={() => {
                       if (props.onSelect != null) {
                           props.onSelect({...props})
                       }
                   }}
            />
            {
                props.isSelected && (
                    <Transformer ref={(node) => {
                        if (props.isSelected) {
                            node?.setNode(imageRef.current);
                            node?.getLayer()?.batchDraw();
                        }
                    }}
                                 boundBoxFunc={(oldBox, newBox) => {
                                     if (newBox.width < 5 || newBox.height < 5) {
                                         return oldBox;
                                     }
                                     return newBox;
                                 }}/>
                )
            }
        </Fragment>
    )
};

export default ImageComponent;
