import React from 'react';

function TimerSelection(props) {
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === "pomodoro" ? "active" : "")} onClick={props.preparePomodoro}>
                <input type="radio" name="options" id="option1" autoComplete="off"/> Pomodoro
            </label>
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === "short-break" ? "active" : "")} onClick={props.prepareShortBreak}>
                <input type="radio" name="options" id="option2" autoComplete="off"/> Short break
            </label>
            <label className={"btn btn-outline-secondary " + (props.currentIntervalType === "long-break" ? "active" : "")} onClick={props.prepareLongBreak}>
                <input type="radio" name="options" id="option3" autoComplete="off" /> Long break
            </label>
        </div>
    );
}

function TimerControls(props) {
    return (
        <div className="btn-group btn-group-lg" role="group">
            <button type="button" className="btn btn-lg btn-primary" onClick={props.handleStartClick}>Start</button>
            <button type="button" className="btn btn-lg btn-secondary" onClick={props.handlePauseClick}>Pause</button>
        </div>
    );
}

function ResetSettingsLogControls(props) {
    return (
        <div className="btn-group btn-group-lg" role="group">
            <button type="button" className="btn btn-danger" onClick={props.handleResetClick}>Reset</button>
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#settings-modal">Settings</button>
            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#log-modal">Logs</button>
        </div>
    );
}

export { TimerSelection, TimerControls, ResetSettingsLogControls };
