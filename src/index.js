import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './PomodoroTimer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PomodoroTimer />, document.getElementById('root'));
registerServiceWorker();
