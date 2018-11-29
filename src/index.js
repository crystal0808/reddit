import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "antd/dist/antd.css";
import './index.css';
import App from './App';
import Popular from './popular';
import Inbox from './Inbox';
import Message from './Message';
import * as serviceWorker from './serviceWorker';
import {Layout} from "antd";

ReactDOM.render(<Router>
    <App>
        <Route exact path="/popular" component={Popular} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/message" component={Message} />
    </App>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
