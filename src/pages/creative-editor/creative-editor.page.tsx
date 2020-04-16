import React from "react";
import {useStyles} from "./styles";
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


const CreativeEditorPage = () => {

    const {layerModelArray, selectedLayerModel} = useSelector<AppState, EditorState>(state => {
        const editorState: EditorState = {
            layerModelArray: state.editor.layerModelArray,
            selectedLayerModel: state.editor.selectedLayerModel
        }
        return editorState
    })

    const dispatch = useDispatch();

    const classes = useStyles();
    return (
        <div className={classes.rootContainer}>
            <div className={classes.leftPanelContainer}>
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
            </div>
            <div className={classes.boardContainer}>
                <BoardComponent
                    layoutVariantArray={layoutVariantList}
                    layerModelArray={layerModelArray}
                    onSelectLayer={(model: LayerModel) => dispatch(selectLayerAction(model))}
                    onDeselectLayer={() => dispatch(deselectLayerAction())}
                />
            </div>
            <div className={classes.rightPanelContainer}>
                <RightPanelComponent
                    layerModel={selectedLayerModel}
                    onLayerUpdateEvent={(model: LayerModel) => {
                        dispatch(updateLayerAction(model))
                        // TODO: write layerModel update action in reducer
                    }}
                />
            </div>
        </div>
    )
};

export default CreativeEditorPage
