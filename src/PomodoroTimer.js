import React, { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';
import { SettingsModal } from './settings';
import { LogModal } from './logging';
import { AboutModal, KeyboardShortcutsInfo  } from './about';
import { TimerControls, ResetSettingsLogControls, TimerSelection } from './controls';
import { s_to_mmss } from './util'


const INTERVAL_TYPES = Object.freeze({
    POMODORO: 1,
    SHORT_BREAK: 2,
    LONG_BREAK: 3
});

const DEFAULT_DURATIONS = Object.freeze({
    POMODORO: 25 * 60,
    SHORT_BREAK: 5 * 60,
    LONG_BREAK: 25 * 60
});

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

function PomodoroTimer(props) {
    const [durations, setDurations] = useState(DEFAULT_DURATIONS)
    const [time, setTime] = useState(25 * 60)
    const [currentBreakInterval, setCurrentBreakInterval] = useState(0)
    const [currentIntervalType, setCurrentIntervalType] = useState(INTERVAL_TYPES.POMODORO)
    const [continuousMode, setContinuousMode] = useState(true)
    const [logs, setLogs] = useState([])
    const [isActive, setIsActive] = useState(false);
    const timerID = useRef(null);

    useEffect(() => {
        if (isActive && timerID.current === null) {
            let newTimerID = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
                if (time === 0) {
                    clearInterval(timerID.current);
                    if (currentIntervalType !== INTERVAL_TYPES.POMODORO) {
                        preparePomodoro();
                    } else if (currentBreakInterval === props.breakInterval) {
                        prepareLongBreak();
                    } else {
                        prepareShortBreak();
                    }

                    if (continuousMode) {
                        startTimer();
                    }
                }

            }, 1000);
            timerID.current = newTimerID;
        } else {
            clearInterval(timerID.current)
            timerID.current = null;
        }
    }, [isActive])

    const startTimer = () => {
        setIsActive(true);
        setLogs([...logs, `Started a ${currentIntervalType} timer at ${getCurrentDatetime()}`])
    }

    const pauseTimer = () => {
        setIsActive(false)
        setLogs([...logs, `Paused a ${currentIntervalType} timer at ${getCurrentDatetime()}`])
    }

    const resetTimer = () => {
        setIsActive(false)
        setTime(durations.POMODORO)
        setCurrentIntervalType(INTERVAL_TYPES.POMODORO)
        setLogs([...logs, `Reset at ${getCurrentDatetime()}`])
    }

    const preparePomodoro = () => {
        if (isActive) {
        setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        setIsActive(false)
        setTime(durations.POMODORO)
        setCurrentIntervalType(INTERVAL_TYPES.POMODORO)
    }

    const prepareShortBreak = () => {
        if (isActive) {
            setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        setIsActive(false)
        setTime(durations.SHORT_BREAK)
        setCurrentIntervalType(INTERVAL_TYPES.SHORT_BREAK)
        setCurrentBreakInterval(currentBreakInterval + 1)
    }

    const prepareLongBreak = () => {
        if (isActive) {
            setLogs([...logs, `Stopped ${currentIntervalType} timer at ${getCurrentDatetime()}`])
        }
        setIsActive(false)
        setTime(durations.LONG_BREAK)
        setCurrentIntervalType(INTERVAL_TYPES.LONG_BREAK)
        setCurrentBreakInterval(0)
    }

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
