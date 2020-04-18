import React from "react";
// import {useStyles} from "./styles";
import {LeftPanelComponent} from "./left-panel/left-panel.component";
import {BoardComponent} from "./board/board.component";
import {RightPanelComponent} from "./right-panel/right-panel.component";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../app-redux/AppState";
import {EditorState} from "../../app-redux/creative-editor/state/EditorState";
import {LayerAction, LayerModel} from "../../models/layer.model";
import {
    addLayerAction,
    deselectLayerAction,
    removeLayerAction,
    selectLayerAction, updateLayerAction
} from "../../app-redux/creative-editor/actionCreators";
import {layoutVariantList} from "./board/data";
import {Col, Container, Row} from "react-bootstrap";


const CreativeEditorPage = () => {

    const {layerModelArray, selectedLayerModel} = useSelector<AppState, EditorState>(state => {
        const editorState: EditorState = {
            layerModelArray: state.editor.layerModelArray,
            selectedLayerModel: state.editor.selectedLayerModel
        }
        return editorState
    })

    const dispatch = useDispatch();

    // const classes = useStyles();
    return (
        <Container fluid>
            <Row>
                <Col sm={2}>
                    <LeftPanelComponent
                        layerModelArray={layerModelArray}
                        layerModelCallback={(model: LayerModel) => {
                            if (model.action === LayerAction.ADD) {
                                dispatch(addLayerAction(model))
                            } else if (model.action === LayerAction.REMOVE) {
                                dispatch(removeLayerAction(model))
                            } else if (model.action === LayerAction.SELECT) {
                                dispatch(selectLayerAction(model))
                            }
                        }}/>
                </Col>
                <Col sm={8}>
                    <BoardComponent
                        layoutVariantArray={layoutVariantList}
                        layerModelArray={layerModelArray}
                        onSelectLayer={(model: LayerModel) => dispatch(selectLayerAction(model))}
                        onDeselectLayer={() => dispatch(deselectLayerAction())}
                    />
                </Col>
                <Col sm={2}>
                    <RightPanelComponent
                        layerModel={selectedLayerModel}
                        onLayerUpdateEvent={(model: LayerModel) => {
                            dispatch(updateLayerAction(model))
                        }}
                    />
                </Col>
            </Row>
        </Container>
    )
};

export default CreativeEditorPage
