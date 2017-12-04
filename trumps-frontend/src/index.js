import React from 'react';
import ReactDOM from 'react-dom';
import './css/Index.css';
import WordPressConnect from './app/WordPressConnect';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<WordPressConnect />, document.getElementById('root'));
registerServiceWorker();
