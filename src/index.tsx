import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from "./components/app-nav.router";
import {Provider} from "react-redux";
import {store} from "./app-redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

import {library} from "@fortawesome/fontawesome-svg-core";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faKey)

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
