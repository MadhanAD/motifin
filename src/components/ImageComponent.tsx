import React, {useRef, Fragment} from "react";
import {Image, Transformer} from "react-konva";
import {LayerImageOptions} from "../models/LayerModel";

export interface ImageProps {
    id?: string;
    data?: LayerImageOptions;
    onSelect?: (props: ImageProps) => void;
    onChange?: (props: LayerImageOptions) => void;
}

const ImageComponent = (props: ImageProps) => {
    // @ts-ignore
    let imageRef = useRef<Image>(new window.Image());
    const imageSrc = new window.Image();
    imageSrc.src = props.data?.imageUrl || "";
    return (
        <Fragment key={props.id}>
            <Image ref={imageRef}
                   x={props?.data?.x}
                   y={props?.data?.y}
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
                props?.data?.isSelected && (
                    <Transformer ref={(node) => {
                        if (props?.data?.isSelected) {
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
