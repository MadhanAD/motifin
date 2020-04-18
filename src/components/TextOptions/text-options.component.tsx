import React, {FormEvent, useState} from 'react';
import {LayerTextOptions} from "../../models/layer.model";
import {styles} from "./styles";
import {Col, Container, Form, Row, Button, FormControl, FormLabel} from "react-bootstrap";
import {GlobalStyle} from "../../utility/GlobalStyle";
import {GlobalColors} from "../../utility/GlobalColors";

export interface TextOptionsProps {
    data?: LayerTextOptions;
    onUpdateEvent: (arg: LayerTextOptions) => void
}

const TextOptionsComponent = (props: TextOptionsProps) => {
    const [text, setText] = useState<string>(props.data && props.data.text ? props?.data.text : "")
    const [fontSize, setFontSize] = useState<number>(props.data && props.data.fontSize ? props.data.fontSize : 14)
    const [fontColor, setFontColor] = useState<string>(props.data && props.data.fontColor ? props.data.fontColor : GlobalColors.black)

    return (
        <Container style={{...GlobalStyle.noSpace, ...styles.rootContainer}}>
            <Row>
                <FormLabel>Text Values</FormLabel>
                <FormControl style={styles.formControl}
                       type="text"
                       placeholder="Enter your text"
                       defaultValue={text}
                       onChange={(event: FormEvent<HTMLInputElement>) => setText(event.currentTarget.value)}
                />
            </Row>
            <Row>
                <FormControl
                    style={styles.formControl}
                    defaultValue={fontSize}
                    type="number"
                    max="5" min="2"
                    placeholder="Font size"
                    onChange={(event: FormEvent<HTMLInputElement>) => setFontSize(Number(event.currentTarget.value))}
                />
            </Row>
            <Row>
                <FormControl
                    style={styles.formControl}
                    type="text"
                    defaultValue={fontColor}
                    placeholder="#000"
                    onChange={(event: FormEvent<HTMLInputElement>) => setFontColor(event.currentTarget.value)}
                />
            </Row>
            <Row className="justify-content-center">
                <Button
                    style={styles.formControl}
                    variant="success"
                    onClick={() => {
                        const option: LayerTextOptions = {
                            ...props.data,
                            text,
                            fontColor,
                            fontSize
                        }
                        props.onUpdateEvent(option)
                    }}
                >Update</Button>
            </Row>
        </Container>

    )
}

export default TextOptionsComponent;
