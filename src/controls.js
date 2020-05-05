import React from 'react';
import { INTERVAL_TYPES } from './constants';

function TimerSelection(props) {
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === INTERVAL_TYPES.POMODORO ? "active" : "")} onClick={props.preparePomodoro}>
                <input type="radio" name="options" id="option1" autoComplete="off"/> Pomodoro
            </label>
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === INTERVAL_TYPES.SHORT_BREAK ? "active" : "")} onClick={props.prepareShortBreak}>
                <input type="radio" name="options" id="option2" autoComplete="off"/> Short break
            </label>
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === INTERVAL_TYPES.LONG_BREAK ? "active" : "")} onClick={props.prepareLongBreak}>
                <input type="radio" name="options" id="option3" autoComplete="off" /> Long break
            </label>
        </div>
    );
}

function TimerControls({startTimer, pauseTimer}) {
    return (
        <div className="btn-group btn-group-lg" role="group">
            <button type="button" className="btn btn-lg btn-primary" onClick={startTimer}>Start</button>
            <button type="button" className="btn btn-lg btn-secondary" onClick={pauseTimer}>Pause</button>
        </div>
    );
}

function ResetSettingsLogControls({ resetTimer }) {
    return (
        <div className="btn-group btn-group-lg" role="group">
            <button type="button" className="btn btn-danger" onClick={resetTimer}>Reset</button>
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#settings-modal">Settings</button>
            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#log-modal">Logs</button>
        </div>
    );
}

export { TimerSelection, TimerControls, ResetSettingsLogControls };
