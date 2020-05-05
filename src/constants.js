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

export { INTERVAL_TYPES, DEFAULT_DURATIONS }
