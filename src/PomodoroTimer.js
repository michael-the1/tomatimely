import React from 'react';
import './PomodoroTimer.css';
import bells from './audio/bells.wav';
import bells2 from './audio/bells2.mp3';
import dingdong from './audio/dingdong.wav'
import { SettingsModal } from './settings';
import { LogModal } from './logging';
import { AboutModal, KeyboardShortcutsInfo  } from './about';
import { TimerControls, ResetSettingsLogControls, TimerSelection } from './controls';
import { s_to_mmss } from './util'

function CountdownTimer(props) {
    return <h1 id="countdown-timer">{s_to_mmss(props.time)}</h1>;
}

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1 className="navbar-brand">Tomatimely</h1>
            <button className="btn btn-link" data-toggle="modal" data-target="#about-modal">About</button>
        </nav>
    );
}

var sounds = {'bells': bells, 'bells2': bells2, 'dingdong': dingdong};

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
            timerID: null,
            enableAudio: false,
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
        } else if (e.key === "1") {
            this.preparePomodoro();
        } else if (e.key === "2") {
            this.prepareShortBreak();
        } else if (e.key === "3") {
            this.prepareLongBreak();
        } else if (e.key === "r") {
            this.handleResetClick();
        }
    }

    handleStartClick = () => {
        if (this.state.timerID === null) {
            var timerID = setInterval(() => {
                this.setState(prevState => ({
                    time: prevState.time - 1,
                }));

                if (this.state.time === 0) {
                    this.playAudio();
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
            currentIntervalType: 'pomodoro',
        });
    }

    preparePomodoro = () => {
        clearInterval(this.state.timerID);
        this.setState({
            timerID: null,
            time: this.state.durations.pomodoro,
            currentIntervalType: 'pomodoro',
        })
    }

    prepareShortBreak = () => {
        clearInterval(this.state.timerID);
        this.setState(prevState => ({
            timerID: null,
            time: this.state.durations.shortBreak,
            currentBreakInterval: prevState.currentBreakInterval + 1,
            currentIntervalType: 'short-break',
        }));
    }

    prepareLongBreak = () => {
        clearInterval(this.state.timerID);
        this.setState({
            timerID: null,
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

    handleAudioChange = (e) => {
        this.setState(prevState => ({
            enableAudio: !prevState.enableAudio,
        }));
    }

    playAudio = (e) => {
        if ( this.state.enableAudio ) {
            var audio = new Audio(sounds[this.state.sound]);
            audio.play()
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container text-center my-2">

                    <TimerSelection
                        preparePomodoro={this.preparePomodoro}
                        prepareShortBreak={this.prepareShortBreak}
                        prepareLongBreak={this.prepareLongBreak}
                        currentIntervalType={this.state.currentIntervalType}
                    />

                    <CountdownTimer time={this.state.time}/>
                        <TimerControls
                            handleStartClick={this.handleStartClick}
                            handlePauseClick={this.handlePauseClick}
                        />

                    <div className="my-1">
                        <ResetSettingsLogControls
                            handleResetClick={this.handleResetClick}
                        />

                        <SettingsModal
                            durations={this.state.durations}
                            handleTimeChange={this.handleTimeChange}
                            handleContinuousModeChange={this.handleContinuousModeChange}
                            continuousMode={this.state.continuousMode}
                            enableAudio={this.state.enableAudio}
                            handleAudioChange={this.handleAudioChange}
                        />

                        <LogModal
                            logs={this.props.logs}
                        />
                    </div>

                    <AboutModal />
                    <KeyboardShortcutsInfo />
                </div>
            </div>
        );
    }
}



export default PomodoroTimer;
