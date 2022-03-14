import React, {  } from 'react';
import './css/Spinner.css';

export function Spinner() {
    return (
        <div
            className="running"
            style={{
                width: "100px",
                height: "100px",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
            }}
        >
            <div className="outer">
                <div className="runnerbody">
                    <div className="arm behind"></div>
                    <div className="arm front"></div>
                    <div className="leg behind"></div>
                    <div className="leg front"></div>
                </div>
            </div>
        </div>
    );
}