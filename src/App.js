import './App.css';

import React from "react";
import './assets/scss/style.scss';
import MyRouter from "./routers/MyRouter";
import {Provider} from "react-redux";
import {store} from "./redux/Store";

function App() {


    return (

        <Provider store={store}>
            <MyRouter/>
        </Provider>

    );
}

export default App;
