import React from 'react';

function LogModal(props) {
    return (
        <div className="modal fade" id="log-modal" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="log-modal-label">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="log-modal-label">Logs</h3>
                    </div>
                    <div className="modal-content">
                        <p>Coming Soon™</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { LogModal };
