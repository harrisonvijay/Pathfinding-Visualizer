import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import dijkstra from "../algorithms/dijkstra";
import bestfs from "../algorithms/best-first-search";
import astar from "../algorithms/astar";
import "./Grid.css";

function genWeight(isWeighted) {
    if (isWeighted) {
        const rand = Math.floor(Math.random() * 8) + 1;
        return rand;
    }
    return 0;
}

function emptyGrid(rowCount, colCount, startCell, endCell, isWeighted) {
    const newGrid = [];
    for (let row = 0; row < rowCount; row++) {
        let currentRow = [];
        for (let col = 0; col < colCount; col++) {
            currentRow.push({
                row: row,
                col: col,
                isWall: false,
                isStart: (row === startCell.row && col === startCell.col),
                isFinish: (row === endCell.row && col === endCell.col),
                distance: Infinity,
                weight: genWeight(isWeighted),
                isWeighted: isWeighted,
                prevCell: null,
                visited: false
            });
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

function emptyGridMaintainWallsAndWeights(grid, rowCount, colCount, startCell, endCell, isWeighted) {
    const newGrid = [];
    for (let row = 0; row < rowCount; row++) {
        let currentRow = [];
        for (let col = 0; col < colCount; col++) {
            currentRow.push({
                row: row,
                col: col,
                isWall: grid[row][col].isWall,
                isStart: (row === startCell.row && col === startCell.col),
                isFinish: (row === endCell.row && col === endCell.col),
                distance: Infinity,
                weight: isWeighted ? (grid[row][col].weight === 0 ? genWeight(isWeighted) : grid[row][col].weight) : 0,
                isWeighted: isWeighted,
                prevCell: null,
                visited: false
            });
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

function newGridDifferentWeights(grid, rowCount, colCount) {
    const newGrid = [];
    for (let row = 0; row < rowCount; row++) {
        let currentRow = [];
        for (let col = 0; col < colCount; col++) {
            currentRow.push({
                row: row,
                col: col,
                isWall: grid[row][col].isWall,
                isStart: grid[row][col].isStart,
                isFinish: grid[row][col].isFinish,
                distance: grid[row][col].distance,
                weight: genWeight(grid[row][col].isWeighted),
                isWeighted: grid[row][col].isWeighted,
                prevCell: grid[row][col].prevCell,
                visited: grid[row][col].visited
            });
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

function prepareGrid(grid) {
    var rowCount = grid.length;
    var colCount = grid[0].length;
    for (var row = 0; row < rowCount; row++) {
        for (var col = 0; col < colCount; col++) {
            grid[row][col].visited = false;
            grid[row][col].distance = Infinity;
            grid[row][col].prevCell = null;
            const id = `cell-${row}-${col}`;
            var cellClasses = "cell noselect";
            if (grid[row][col].isStart) {
                cellClasses += " cell-start";
            }
            if (grid[row][col].isFinish) {
                cellClasses += " cell-finish";
            }
            if (grid[row][col].isWall) {
                cellClasses += " cell-wall";
            }
            document.getElementById(id).className = cellClasses;
        }
    }
    return grid;
}

function resetAll(grid) {
    var rowCount = grid.length;
    var colCount = grid[0].length;
    for (var row = 0; row < rowCount; row++) {
        for (var col = 0; col < colCount; col++) {
            grid[row][col].visited = false;
            grid[row][col].distance = Infinity;
            grid[row][col].prevCell = null;
            grid[row][col].isWall = false;
            const id = `cell-${row}-${col}`;
            var cellClasses = "cell noselect";
            if (grid[row][col].isStart) {
                cellClasses += " cell-start";
            }
            if (grid[row][col].isFinish) {
                cellClasses += " cell-finish";
            }
            document.getElementById(id).className = cellClasses;
        }
    }
    return grid;
}

function toggleWall(grid, row, col) {
    if (!grid[row][col].isStart && !grid[row][col].isFinish)
        grid[row][col].isWall = !grid[row][col].isWall;
    return grid;
}

export default function Grid(props) {
    const [isMousePressed, setMousePressed] = useState(0);
    const { rowCount, colCount, startCell, endCell, isWeighted, resetCallback, reset, visualizingOver, isVisualizing, algorithm, setStartCell, setEndCell, regenerateWeights, regenerateWeightsCallback } = props;
    const [grid, setGrid] = useState(emptyGrid(rowCount, colCount, startCell, endCell, isWeighted));

    useEffect(() => {
        setGrid(grid => prepareGrid(grid));
        setGrid(grid => emptyGridMaintainWallsAndWeights(grid, rowCount, colCount, startCell, endCell, isWeighted));
        const gridDOM = document.getElementById("grid");
        if (isWeighted) {
            gridDOM.className = "grid";
        } else {
            gridDOM.className = "grid transparent-font";
        }
    }, [isWeighted, rowCount, colCount, startCell, endCell]);

    useEffect(() => {
        if (reset) {
            setGrid(grid => resetAll(grid));
            resetCallback();
        }
    }, [reset, resetCallback]);

    useEffect(() => {
        if (regenerateWeights) {
            setGrid(grid => prepareGrid(grid));
            setGrid(grid => newGridDifferentWeights(grid, rowCount, colCount));
            regenerateWeightsCallback();
        }
    }, [regenerateWeights, regenerateWeightsCallback, rowCount, colCount]);

    useEffect(() => {
        function animatePathCell(grid, row, col, i, m) {
            const id = `cell-${row}-${col}`;
            setTimeout(() => {
                if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                    document.getElementById(id).className = "cell cell-path";
                }
                if (i === m - 1) {
                    visualizingOver(true);
                }
            }, 30 * i);
        }

        function animateVisitedCell(grid, row, col, i, n, shortestPathInReverse) {
            const id = `cell-${row}-${col}`;
            const m = shortestPathInReverse.length;
            setTimeout(() => {
                if (!grid[row][col].isStart && !grid[row][col].isFinish) {
                    document.getElementById(id).className = "cell cell-visited";
                }
                if (i === n - 1) {
                    if (shortestPathInReverse.length === 1) {
                        visualizingOver(false);
                    }
                    else {
                        shortestPathInReverse.forEach(([path_row, path_col], j) => {
                            animatePathCell(grid, path_row, path_col, j, m);
                        });
                    }
                }
            }, 20 * i);
        }

        function visualize() {
            var algo;
            if (algorithm === "BFS")
                algo = bfs;
            else if (algorithm === "DFS")
                algo = dfs;
            else if (algorithm === "BestFirstSearch")
                algo = bestfs;
            else if (algorithm === "A*")
                algo = astar;
            else if (algorithm === "Dijkstra")
                algo = dijkstra;
            const [visitedOrder, shortestPathInReverse] = algo(grid.slice(), startCell, endCell);
            shortestPathInReverse.reverse();
            const n = visitedOrder.length;
            visitedOrder.forEach(([row, col], i) => {
                animateVisitedCell(grid, row, col, i, n, shortestPathInReverse);
            });
        }

        if (isVisualizing) {
            setGrid(prepareGrid(grid));
            visualize();
        }
    }, [isVisualizing, grid, algorithm, startCell, endCell, visualizingOver]);

    function handleMouseDown(row, col) {
        setGrid(prepareGrid(grid));
        if (grid[row][col].isStart) {
            setMousePressed(2);
        } else if (grid[row][col].isFinish) {
            setMousePressed(3);
        } else {
            setMousePressed(1);
            const newGrid = toggleWall(grid.slice(), row, col);
            setGrid(newGrid);
        }
    }

    function handleMouseEnter(row, col) {
        if (isMousePressed === 0) return;
        setGrid(prepareGrid(grid));
        if (isMousePressed === 1) {
            const newGrid = toggleWall(grid.slice(), row, col);
            setGrid(newGrid);
        } else if (isMousePressed === 2) {
            if (!grid[row][col].isWall && !grid[row][col].isFinish) {
                setStartCell(row, col);
            }
        } else if (isMousePressed === 3) {
            if (!grid[row][col].isWall && !grid[row][col].isStart) {
                setEndCell(row, col);
            }
        }
    }

    function handleMouseUp() {
        setMousePressed(0);
    }

    return <div className="grid-container">
        <div id="grid" className="grid">
            {grid.map((row, row_i) => {
                return (
                    <div className="row" key={row_i}>
                        {row.map((cell, cell_i) => {
                            return (
                                <Cell
                                    key={cell_i}
                                    row={cell.row}
                                    col={cell.col}
                                    weight={cell.weight}
                                    isWall={cell.isWall}
                                    isStart={cell.isStart}
                                    isFinish={cell.isFinish}
                                    isMousePressed={isMousePressed}
                                    handleMouseDown={handleMouseDown}
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseUp={handleMouseUp}
                                    isWeighted={cell.isWeighted}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>
}