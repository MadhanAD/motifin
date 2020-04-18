import {Button, Container, FormControl, Row} from "react-bootstrap";
import React, {FormEvent, useState} from "react";
import {LayerImageOptions} from "../../models/layer.model";
import {styles} from "./styles";

export interface ImageOptionsProps {
    data: LayerImageOptions;
    onUpdateEvent: (options: LayerImageOptions) => void
}

const ImageOptionComponent = (props: ImageOptionsProps) => {
    const [imageUrl, setImageUrl] = useState<string>("")
    return (
        <Container style={styles.rootContainer}>
            <Row>
                <FormControl
                    type="text"
                    onChange={(event: FormEvent<HTMLInputElement>) => {
                        setImageUrl(event.currentTarget.value)
                    }}
                />
            </Row>
            <Row>
                <Button variant="primary"
                        onClick={() => {
                            if (imageUrl !== "") {
                                const model: LayerImageOptions = props.data
                                model.imageUrl = imageUrl
                                props.onUpdateEvent(model)
                            }
                        }}
                >Update</Button>
            </Row>
        </Container>
    )
}

export default ImageOptionComponent

