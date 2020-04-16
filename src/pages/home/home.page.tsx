import React from "react";
import {useStyles} from "./styles";
import {Container, Row, Col} from "react-bootstrap";

const HomePage = () => {
    const classes = useStyles();
    return (
        <Container style={{backgroundColor: "#009944"}}>
            <Col style={{backgroundColor: "#000099"}}>
                <Row style={{backgroundColor: "#449900"}} xl={8} xs={8} lg={8} md={8} sm={8}>sm=8</Row>
                <Col xl={4} xs={4} lg={4} md={4} sm={4}>sm=4</Col>
            </Col>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
        </Container>
    )
};

export default HomePage
