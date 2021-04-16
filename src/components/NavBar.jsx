import React from "react";
import "./NavBar.css";

export default function NavBar(props) {
    function onAlgoChange() {
        const algoIndex = Number(document.getElementById("algo-choice").value);
        props.setAlgorithmName(algoIndex);
        const weightChoice = document.getElementById("weight-choice");
        if (algoIndex > 1) {
            weightChoice.removeAttribute("disabled");
        } else {
            weightChoice.value = "0";
            weightChoice.setAttribute("disabled", true);
            props.setWeighted(false);
        }
    }

    function onIsWeightedChange() {
        const isWeightedValue = Number(document.getElementById("weight-choice").value);
        props.setWeighted(isWeightedValue === 1);
    }

    function handleVisualizeClick() {
        props.startVisualize();
    }

    function handleClearGridClick() {
        props.resetGrid();
    }

    return (
        <div className="nav-bar">
            <div className="nav-item">
                <h1>Pathfinding Visualizer</h1>
            </div>
            <div className="nav-item">
                <select id="algo-choice" onChange={onAlgoChange} defaultValue="0">
                    <option value="0">Breadth First Search</option>
                    <option value="1">Depth First Search</option>
                    <option value="2">Dijkstra's algorithm</option>
                    <option value="3">Best First Search</option>
                    <option value="4">A* algorithm</option>
                </select>
            </div>
            <div className="nav-item">
                <select id="weight-choice" onChange={onIsWeightedChange} defaultValue="0" disabled>
                    <option value="0">Unweighted</option>
                    <option value="1">Weighted</option>
                </select>
            </div>
            <div className="nav-item">
                <button onClick={handleVisualizeClick}>
                    Visualize
                </button>
            </div>
            <div className="nav-item">
                <button onClick={handleClearGridClick}>
                    Clear Grid
                </button>
            </div>
        </div>
    );
}