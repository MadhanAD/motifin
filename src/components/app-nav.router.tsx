import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../App";
import CreativeEditorPage from "../pages/creative-editor/creative-editor.page";
import HomePage from "../pages/home/home.page";

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path={"/"} component={App}/>
                <Route path={"/home"} component={HomePage}/>
                <Route path={"/creative-editor"} component={CreativeEditorPage}/>
            </div>
        </Router>
    )
};

export default AppRouter
