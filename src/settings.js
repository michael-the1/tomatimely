import React from 'react';

function SettingsModal(props) {
    return (
        <div className="modal fade" id="settings-modal" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="settings-modal-label">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="settings-modal-label">Settings</h3>
                    </div>
                    <div className="modal-body container">
                        <form>
                            <div className="form-row">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="enableAudio-check" onChange={props.handleAudioChange} defaultChecked={props.enableAudio} />
                                    <label className="form-check-label" htmlFor="enableAudio-check">
                                        Enable audio
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="continuousMode-check" onChange={props.handleContinuousModeChange} defaultChecked={props.continuousMode} />
                                    <label className="form-check-label" htmlFor="continuousMode-check">
                                        Continuous mode: automatically start the next section
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="settings-pomodoro">Pomodoro</label>
                                    <input id="settings-pomodoro" name="pomodoro" className="form-control" type="number" min="1" max="60" value={props.durations.pomodoro / 60} onChange={(e) => props.handleTimeChange(e)}/>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="settings-short-break">Short break</label>
                                    <input id="settings-short-break" name="shortBreak" className="form-control" type="number" min="1" max="60" value={props.durations.shortBreak / 60} onChange={(e) => props.handleTimeChange(e)}/>
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="settings-long-break">Long break</label>
                                    <input id="settings-long-break" name="longBreak" className="form-control" type="number" min="1" max="60" value={props.durations.longBreak / 60} onChange={(e) => props.handleTimeChange(e)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SettingsModal };
