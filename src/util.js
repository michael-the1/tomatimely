function s_to_mmss(seconds) {
    // Given a time in seconds, return its mm:ss representation
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}

export { s_to_mmss };
