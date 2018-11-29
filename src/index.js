import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import "antd/dist/antd.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Layout} from "antd";

ReactDOM.render(<Router>
    <div>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/r/:id" component={App} />
      </Switch>
    </div>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
