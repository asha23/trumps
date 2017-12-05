import React from 'react';
import ReactDOM from 'react-dom';
import './css/Index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
