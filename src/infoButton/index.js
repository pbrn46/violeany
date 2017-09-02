import React, { Component } from 'react'

import './index.css'

class InfoButton extends Component {
  render() {
    return (
      <div className="InfoButton">
        <button type="button"
          className="InfoButton"
          data-toggle="modal"
          data-target="#InfoButton-modal"
          style={{lineHeight: "10px"}}>
          <svg width="20" height="20">
            <circle
              cx="10" cy="10" r="9"
              strokeWidth="1"
              stroke="#000"
              fill="#fff"
            />
            <text
              x="10" y="15"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fontStyle="italic">i</text>
          </svg>
        </button>
        <div className="modal fade" id="InfoButton-modal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Violeany</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>About</h5>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      Practice your violin scales here!
                    </p>
                  </div>
                </div>

                <h5>Documentation</h5>

                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      Getting Started
                    </h6>
                    <p className="card-text">
                      Press <kbd>Play</kbd> to begin.
                    </p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      Play Mode
                    </h6>
                    <p className="card-text">
                      Pracitce scales in <code>Scales</code>, or tune your instrument in <code>Tuning</code> mode.
                    </p>
                  </div>
                </div>

                <hr />
                <p><small>Created by Boris Wong</small></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoButton
