import {Container, FormControl, Row} from "react-bootstrap";
import React, {FormEvent} from "react";
import {LayerImageOptions} from "../../models/layer.model";
import { styles } from "./styles";

export interface ImageOptionsProps {
    data: LayerImageOptions;
    onUpdateEvent: (options: LayerImageOptions) => void
}

const ImageOptionComponent = (props: ImageOptionsProps) => {
    return (
        <Container style={styles.rootContainer}>
            <Row>
                <FormControl
                    type="file"
                    accept=".png"
                    onChange={(event: FormEvent<HTMLInputElement>) => {
                        const file = event.currentTarget?.files?.[0]
                        if (file) {
                            const option = props.data
                            // @ts-ignore
                            option.imageUrl = file?.uri
                            props.onUpdateEvent(option)
                        }
                    }}
                />
            </Row>
        </Container>
    )
}

export default ImageOptionComponent

