import React, { useState } from "react";
import NavBar from "./NavBar";
import Legend from "./Legend";
import Grid from "./Grid";
import "./PathfindingVisualizer.css";


export default function PathfindingVisualizer() {
    const algorithms = ["BFS", "DFS", "Dijkstra", "BestFirstSearch", "A*"];
    const algoInfoList = [
        "Breadth First Search is an unweighted algorithm. It guarantees the shortest path.",
        "Depth First Search is an unweighted algorithm. It does not guarantee the shortest path.",
        "Dijkstra's algorithm is a weighted algorithm. It guarantees the shortest path.",
        "Best First Search is a weighted algorithm. It does not guarantee the shortest path.",
        "A* algorithm is a weighted algorithm. It guarantees the shortest path."
    ];
    const [startCell, setStartCell] = useState({ row: 10, col: 25 });
    const [endCell, setEndCell] = useState({ row: 18, col: 45 });
    const [isWeighted, setWeighted] = useState(false);
    const [algorithmName, setAlgorithmName] = useState(algorithms[0]);
    const [isVisualizing, setVisualizing] = useState(false);
    const [isReset, setReset] = useState(false);
    const [algoInfo, setAlgoInfo] = useState(algoInfoList[0]);

    function setStartCellCallback(row, col) {
        setStartCell({ row: row, col: col });
    }

    function setEndCellCallback(row, col) {
        setEndCell({ row: row, col: col });
    }

    function setWeightedCallback(bool) {
        setWeighted(bool);
    }

    function setAlgorithmNameCallback(index) {
        setAlgorithmName(algorithms[index]);
        setAlgoInfo(algoInfoList[index]);
    }

    function visualizeCallback() {
        setVisualizing(true);
        document.getElementById("disable-div").style.setProperty("display", "block");
    }

    function visualizingOverCallback(flag) {
        setVisualizing(false);
        document.getElementById("disable-div").style.setProperty("display", "none");
        if (!flag) {
            setTimeout(() => alert("Couldn't find path!"), 500);
        }
    }

    function resetGrid() {
        setReset(true);
    }

    function resetCallback() {
        setReset(false);
    }

    return (
        <div>
            <div id="disable-div" style={{ "display": "none" }}></div>

            <NavBar
                setWeighted={setWeightedCallback}
                setAlgorithmName={setAlgorithmNameCallback}
                startVisualize={visualizeCallback}
                resetGrid={resetGrid}
            />

            <Legend />

            <h3>{algoInfo}</h3>

            <Grid isWeighted={isWeighted}
                algorithm={algorithmName}
                rowCount={20}
                colCount={50}
                startCell={startCell}
                endCell={endCell}
                setStartCell={setStartCellCallback}
                setEndCell={setEndCellCallback}
                isVisualizing={isVisualizing}
                visualizingOver={visualizingOverCallback}
                reset={isReset}
                resetCallback={resetCallback}
            />
        </div>
    );
}