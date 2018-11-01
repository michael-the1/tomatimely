import React from 'react';

function AboutModal(props) {
    return (
        <div className="modal fade" id="about-modal" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="about-modal-label">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="about-modal-label">About</h3>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    <div className="modal-body text-left">
                        <p>
                            The Pomodoro technique is a time management technique to work and study more productively.
                            For more information, check out <a href="https://francescocirillo.com/pages/pomodoro-technique">this page</a>.
                        </p>

                        <h4>How does it work?</h4>
                        <ol>
                            <li>Choose the task to perform</li>
                            <li>Start the Pomodoro timer</li>
                            <li>Work on the task until the timer rings</li>
                            <li>Take a short break. Congratulations, you've completed a pomodoro!</li>
                            <li>Every 4 pomodoros, take a longer break</li>
                        </ol>

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

function KeyboardShortcutsInfo(props) {
    return (
        <div className="card text-left mx-auto my-4" id="keyboard-shortcuts-text">
            <div className="card-body">
                <h5 className="card-title">Keyboard shortcuts</h5>
                <ul>
                    <li>Spacebar: Start / Pause timer</li>
                    <li>1: Pomodoro</li>
                    <li>2: Short break</li>
                    <li>3: Long break</li>
                    <li>r: Reset timer</li>
                </ul>
            </div>
        </div>
    );
}

export { AboutModal, KeyboardShortcutsInfo };
