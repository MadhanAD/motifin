import React, {useState} from 'react';
import {LayerTextOptions} from "../../models/layer.model";
import {useStyles} from "./styles";
import {TextField} from "@material-ui/core";

export interface TextOptionsProps {
    data?: LayerTextOptions;
}


const TextOptionsComponent = (props: TextOptionsProps) => {

    const [textEditStatus, setTextEditStatus] = useState<boolean>(false);

    const classes = useStyles();

    return (
        <section className={classes.rootContainer}>
            <p>Text option section</p>
            <section>
                <TextField value={props.data?.text} />
            </section>
        </section>
    )
}

export default TextOptionsComponent;
