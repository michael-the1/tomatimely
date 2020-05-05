import React from 'react';

function LogModal({ logs }) {
    const logItems = logs.map((logItem) =>
        <li key={ logItem }>
            { logItem }
        </li>
    );

    return (
        <div className="modal fade" id="log-modal" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="log-modal-label">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="log-modal-label">Logs</h3>
                    </div>
                    <div className="modal-content">
                        <ul>{ logItems }</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { LogModal };
