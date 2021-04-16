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
                weight: (row === startCell.row && col === startCell.col) ? 0 : genWeight(isWeighted),
                isWeighted: isWeighted,
                prevCell: null,
                visited: false
            });
        }
        newGrid.push(currentRow);
    }
    return newGrid;
}

function emptyGridMaintainWalls(grid, rowCount, colCount, startCell, endCell, isWeighted) {
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
                weight: (row === startCell.row && col === startCell.col) ? 0 : genWeight(isWeighted),
                isWeighted: isWeighted,
                prevCell: null,
                visited: false
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
    const { rowCount, colCount, startCell, endCell, isWeighted, resetCallback, reset, visualizingOver, isVisualizing, algorithm, setStartCell, setEndCell } = props;
    const [grid, setGrid] = useState(emptyGrid(rowCount, colCount, startCell, endCell, isWeighted));

    useEffect(() => {
        setGrid(grid => emptyGridMaintainWalls(grid, rowCount, colCount, startCell, endCell, isWeighted));
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
        function animatePathCell(grid, row, col, i, m) {
            if (grid[row][col].isStart || grid[row][col].isFinish)
                return;
            const id = `cell-${row}-${col}`;
            setTimeout(() => {
                document.getElementById(id).className = "cell cell-path";
                if (i === m - 2) {
                    visualizingOver(true);
                }
            }, 20 * i);
        }

        function animateVisitedCell(grid, row, col, i, n, shortestPathInReverse) {
            if (grid[row][col].isStart || grid[row][col].isFinish)
                return;
            const id = `cell-${row}-${col}`;
            const m = shortestPathInReverse.length;
            setTimeout(() => {
                document.getElementById(id).className = "cell cell-visited";
                if (i === n - 2) {
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
        if (grid[row][col].isStart) {
            setMousePressed(2);
            setStartCell(row, col);
        } else if (grid[row][col].isFinish) {
            setMousePressed(3);
            setEndCell(row, col);
        } else {
            setMousePressed(1);
            const newGrid = toggleWall(grid.slice(), row, col);
            setGrid(newGrid);
        }
    }

    function handleMouseEnter(row, col) {
        if (isMousePressed === 0) return;
        if (isMousePressed === 1) {
            const newGrid = toggleWall(grid.slice(), row, col);
            setGrid(newGrid);
        } else if (isMousePressed === 2) {
            setStartCell(row, col);
        } else if (isMousePressed === 3) {
            setEndCell(row, col);
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