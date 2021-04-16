import React from "react";
import "./Cell.css";
import "./Legend.css";

export default function Legend() {
    return (
        <div className="legend">
            <div className="legend-item">
                <div className="cell cell-start transparent-font">0</div>
                <p>Start</p>
            </div>
            <div className="legend-item">
                <div className="cell cell-finish transparent-font">0</div>
                <p>End</p>
            </div>
            <div className="legend-item">
                <div className="cell cell-wall transparent-font">0</div>
                <p>Wall</p>
            </div>
            <div className="legend-item">
                <div className="cell noselect">5</div>
                <p>Weighted</p>
            </div>
            <div className="legend-item">
                <div className="cell transparent-font">0</div>
                <p>Unweighted</p>
            </div>
            <div className="legend-item">
                <div className="cell cell-visited transparent-font">0</div>
                <p>Visited</p>
            </div>
            <div className="legend-item">
                <div className="cell cell-path transparent-font">0</div>
                <p>Path</p>
            </div>
        </div>
    )
}