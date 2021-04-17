import React, { useState } from "react";
import "./NavBar.css";

export default function NavBar(props) {
    const [isWeighted, setWeighted] = useState(props.isWeighted);
    const [isWeightedChosen, setWeightedChosen] = useState(false);

    function onAlgoChange() {
        const algoIndex = Number(document.getElementById("algo-choice").value);
        props.setAlgorithmName(algoIndex);
        if (algoIndex > 1) {
            setWeighted(true);
        } else {
            const weightChoice = document.getElementById("weight-choice");
            weightChoice.value = "0";
            setWeighted(false);
            setWeightedChosen(false);
            props.setWeighted(false);
        }
    }

    function onIsWeightedChange() {
        const isWeightedValue = Number(document.getElementById("weight-choice").value);
        props.setWeighted(isWeightedValue === 1);
        setWeightedChosen(isWeightedValue === 1);
    }

    function handleVisualizeClick() {
        props.startVisualize();
    }

    function handleClearGridClick() {
        props.resetGrid();
    }

    function handleRegenerateWeightsClick() {
        props.regenerateWeights();
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
                <select id="weight-choice" onChange={onIsWeightedChange} defaultValue="0" disabled={!isWeighted}>
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
                <button onClick={handleRegenerateWeightsClick} disabled={!isWeightedChosen}>
                    Regenerate Weights
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