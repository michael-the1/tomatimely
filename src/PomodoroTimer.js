import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';
import { DEFAULT_DURATIONS, INTERVAL_TYPES } from './constants'
import { SettingsModal } from './settings';
import { LogModal } from './logging';
import { AboutModal, KeyboardShortcutsInfo  } from './about';
import { TimerControls, ResetSettingsLogControls, TimerSelection } from './controls';
import { s_to_mmss } from './util'



function getCurrentDatetime() {
    // Get current Datetime, e.g., "Sat Nov 03 2018 12:18:48"
    var d = new Date();
    return d.toString().slice(0, 24);
}

function CountdownTimer({ time }) {
    return <h1 id="countdown-timer">{s_to_mmss(time)}</h1>;
}

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1 className="navbar-brand">Tomatimely</h1>
            <button className="btn btn-link" data-toggle="modal" data-target="#about-modal">About</button>
        </nav>
    );
}


function useTimer(timerDuration, continuousMode) {
    const [time, setTime] = useState(timerDuration)
    const [isActive, setIsActive] = useState(false);
    const [timerID, setTimerID] = useState(null);

    useEffect(() => {
        if (isActive && timerID === null) {
            let newTimerID = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
                if (time === 0) {
                    clearInterval(timerID);
                    setIsActive(false);
                    if (continuousMode) {
                        startTimer();
                    }
                }
            }, 1000);
            setTimerID(newTimerID);
        } else {
            clearInterval(timerID)
            setTimerID(null);
        }
    }, [isActive]);

    const startTimer = () => {
        setIsActive(true);
    }

    const pauseTimer = () => {
        setIsActive(false)
    }

    const resetTimer = (newTimerDuration) => {
        setIsActive(false)
        setTime(newTimerDuration)
    }

    return [time, setTime, isActive, startTimer, pauseTimer, resetTimer]
}

function PomodoroTimer(props) {
    const [continuousMode, setContinuousMode] = useState(true)
    const [time, setTime, isActive, startTimer, pauseTimer, resetTimer] = useTimer(DEFAULT_DURATIONS.POMODORO, continuousMode)

    const [durations, setDurations] = useState(DEFAULT_DURATIONS)
    const [currentBreakInterval, setCurrentBreakInterval] = useState(0)
    const [currentIntervalType, setCurrentIntervalType] = useState(INTERVAL_TYPES.POMODORO)
    const [maxBreakInterval, setMaxBreakInterval] = useState(4)

    const [logs, setLogs] = useState([])

    const preparePomodoro = () => {
        if (isActive) {
            setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        resetTimer(durations.POMODORO);
        setCurrentIntervalType(INTERVAL_TYPES.POMODORO)
    }

    const prepareShortBreak = () => {
        if (isActive) {
            setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        resetTimer(durations.SHORT_BREAK);
        setCurrentIntervalType(INTERVAL_TYPES.SHORT_BREAK)
        setCurrentBreakInterval(currentBreakInterval + 1)
    }

    const prepareLongBreak = () => {
        if (isActive) {
            setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        resetTimer(durations.LONG_BREAK);
        setCurrentIntervalType(INTERVAL_TYPES.LONG_BREAK)
        setCurrentBreakInterval(0)
    }

    useEffect(() => {
        if (time === 0) {
            if (currentIntervalType !== INTERVAL_TYPES.POMODORO) {
                preparePomodoro();
            } else if (currentBreakInterval === maxBreakInterval) {
                prepareLongBreak();
            } else {
                prepareShortBreak();
            }
        }
    }, [time]);

    useEffect(() => {
        function handleKeyPress(e) {
            if (e.key === " ") {
                if (isActive) {
                    pauseTimer();
                } else {
                    startTimer();
                }
            } else if (e.key === "q") {
                preparePomodoro();
            } else if (e.key === "w") {
                prepareShortBreak();
            } else if (e.key === "e") {
                prepareLongBreak();
            } else if (e.key === "r") {
                resetTimer();
            }
        }

        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        }
    });

    return (
        <>
            <NavBar />
            <div className="container text-center my-2">

                <TimerSelection
                    preparePomodoro={preparePomodoro}
                    prepareShortBreak={prepareShortBreak}
                    prepareLongBreak={prepareLongBreak}
                    currentIntervalType={currentIntervalType}
                />

                <CountdownTimer time={time}/>

                <TimerControls
                    startTimer={startTimer}
                    pauseTimer={pauseTimer}
                />

                <div className="my-1">
                    <ResetSettingsLogControls
                        resetTimer={resetTimer}
                    />

                    <SettingsModal
                        durations={durations}
                        setDurations={setDurations}
                        continuousMode={continuousMode}
                        setContinuousMode={setContinuousMode}
                    />

                    <LogModal
                        logs={logs}
                    />
                </div>

                <AboutModal />
                <KeyboardShortcutsInfo />
            </div>
        </>
    );

}

export default PomodoroTimer;
