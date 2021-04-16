import React from "react";
import "./Cell.css";

export default function Cell(props) {
    const row = props.row;
    const col = props.col;
    const isStart = props.isStart;
    const isFinish = props.isFinish;
    const isWall = props.isWall;
    const isWeighted = props.isWeighted;
    function handleMouseDown() {
        props.handleMouseDown(row, col);
    }
    function handleMouseEnter() {
        props.handleMouseEnter(row, col);
    }
    const handleMouseUp = props.handleMouseUp;
    var cellClasses = "cell";
    if (isStart) {
        cellClasses += " cell-start";
    }
    if (isFinish) {
        cellClasses += " cell-finish";
    }
    if (isWall) {
        cellClasses += " cell-wall";
    }
    if (!isWeighted) {
        cellClasses += " transparent-font";
    }
    return (
        <div
            id={`cell-${row}-${col}`}
            className={cellClasses + " noselect"}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
        >{props.weight}</div>
    );
}