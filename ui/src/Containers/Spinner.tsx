import React, {  } from 'react';
import './css/Spinner.css';

export function Spinner() {
  
    return (
        <div className="running">
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