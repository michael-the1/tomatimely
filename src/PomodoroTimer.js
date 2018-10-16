import React from 'react';
import './PomodoroTimer.css';

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

function CountdownTimer(props) {
    return <h1 id="countdown-timer">{s_to_mmss(props.time)}</h1>;
}

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
                                    <input className="form-check-input" type="checkbox" value="" id="autoresume-check" onChange={props.handleContinuousModeChange} defaultChecked="{props.continuousMode}" />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
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

function LogModal(props) {
    return (
        <div className="modal fade" id="log-modal" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="log-modal-label">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="log-modal-label">Logs</h3>
                    </div>
                    <div className="modal-content">
                        <p>Placeholder text</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AboutCard(props) {
    return (
        <div className="row">
            <div className="col-sm-6 mx-auto">
                <div className="card" id="about-card">
                    <div className="card-body text-left">
                        <h4 className="card-title">About</h4>
                        <p className="card-text">
                            The Pomodoro technique is a time management technique to work and study more productively.
                            For more information, check out <a href="https://francescocirillo.com/pages/pomodoro-technique">this page</a>.
                        </p>

                        <h4 className="card-title">How does it work?</h4>
                        <p>
                            <ol>
                                <li>Choose the task to perform</li>
                                <li>Start the Pomodoro timer</li>
                                <li>Work on the task until the timer rings</li>
                                <li>Take a short break. Congratulations, you've completed a pomodoro!</li>
                                <li>Every 4 pomodoros, take a longer break</li>
                            </ol>
                        </p>

                        <h4>Why does it work?</h4>
                        <p>Distractions are all around us. Right when we're in the middle of some focused work or study, we might get interrupted by an instant message, an e-mail, or a colleague dropping by. The goal of the Pomodoro technique is to limit the impact of these distractions. Try to stay focused during the whole session and postpone your distractions until later. See an e-mail coming in? You can look at it after finishing your pomodoro. Does a colleague want to grab coffee? Ask if they can wait until your break starts.</p>

                        <h4>What's a pomodoro?</h4>
                        <p>"Pomodoro" means "tomato" in Italian. The inventor of the Pomodoro technique, Francesco Cirillo, named the technique after the tomato-shaped timer from his university days.</p>

                        <h4>About Tomatimely</h4>
                        <p>Tomatimely is developed by <a href="http://www.michaelthe.com">Michael The</a> and the result of trying out countless Pomodoro timer apps and websites and feeling unsatisfied by all of them. They would all miss some feature the other would have. Tomatimely is made perfect for me — and maybe you'll find it useful as well.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            durations: {
                pomodoro: 25 * 60,
                shortBreak: 5 * 60,
                longBreak: 25 * 60,
            },
            time: 25 * 60,
            currentBreakInterval: 0,
            currentIntervalType: 'pomodoro',
            continuousMode: true,
        };
    }

    componentDidMount() {
        document.addEventListener("keypress", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        if (e.key === " ") {
            if (this.state.timerID) {
                this.handlePauseClick();
            } else {
                this.handleStartClick();
            }
        }
    }

    handleStartClick = () => {
        var timerID = setInterval(() => {
            this.setState(prevState => ({
                time: prevState.time - 1,
            }));

            if (this.state.time === 0) {
                clearInterval(this.state.timerID);

                if (this.state.currentIntervalType !== 'pomodoro') {
                    this.preparePomodoro();
                } else if (this.state.currentBreakInterval === this.props.breakInterval) {
                    this.prepareLongBreak();
                } else {
                    this.prepareShortBreak();
                }

                if (this.state.continuousMode) {
                    this.handleStartClick();
                }
            }

        }, 1000);
        this.setState({timerID: timerID});
    }

    handlePauseClick = () => {
        clearInterval(this.state.timerID);
        this.setState({timerID: null});
    }

    handleResetClick = () => {
        clearInterval(this.state.timerID);
        this.setState({
            timerID: null,
            time: this.state.durations.pomodoro,
        });
    }

    preparePomodoro = () => {
        this.setState({
            time: this.state.durations.pomodoro,
            currentIntervalType: 'pomodoro',
        })
    }

    prepareShortBreak = () => {
        this.setState(prevState => ({
            time: this.state.durations.shortBreak,
            currentBreakInterval: prevState.currentBreakInterval + 1,
            currentIntervalType: 'short-break',
        }));
    }

    prepareLongBreak = () => {
        this.setState({
            time: this.state.durations.longBreak,
            currentBreakInterval: 0,
            currentIntervalType: 'long-break',
        });
    }

    handleTimeChange = (e) => {
        var durations = this.state.durations;
        const name = e.target.name;

        if (name === 'pomodoro') {
            durations.pomodoro = e.target.value * 60;
        } else if (name === 'shortBreak') {
            durations.shortBreak = e.target.value * 60;
        } else if (name === 'longBreak') {
            durations.longBreak = e.target.value * 60;
        }

        this.setState({durations: durations});
    }

    handleContinuousModeChange = (e) => {
        this.setState(prevState => ({
            continuousMode: !prevState.continuousMode,
        }));
    }

    render() {
        return (
            <div className="text-center">
                <TimerSelection
                    preparePomodoro={this.preparePomodoro}
                    prepareShortBreak={this.prepareShortBreak}
                    prepareLongBreak={this.prepareLongBreak}
                    currentIntervalType={this.state.currentIntervalType}
                />

                <CountdownTimer time={this.state.time}/>
                <div>
                    <TimerControls
                        handleStartClick={this.handleStartClick}
                        handlePauseClick={this.handlePauseClick}
                    />
                </div>

                <div className="my-1">
                    <ResetSettingsLogControls
                        handleResetClick={this.handleResetClick}
                    />

                    <SettingsModal
                        durations={this.state.durations}
                        handleTimeChange={this.handleTimeChange}
                        handleContinuousModeChange={this.handleContinuousModeChange}
                        continuousMode={this.state.continuousMode}
                    />

                    <LogModal
                        logs={this.props.logs}
                    />
                </div>
                <div className="my-4">
                    <AboutCard />
                </div>
            </div>
        );
    }
}

function s_to_mmss(seconds) {
    // Given a time in seconds, return its mm:ss representation
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}

export default PomodoroTimer;
