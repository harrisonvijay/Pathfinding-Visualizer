import { PQElement, PriorityQueue } from "../datastructures/PriorityQueue.js";

// Manhattan Distance
function calculateHeuristic(row, col, endRow, endCol) {
    return Math.abs(row - endRow) + Math.abs(col - endCol);
}

function visit(grid, pq, currDist, prevRow, prevCol, row, col, endRow, endCol) {
    const maxRows = grid.length;
    const maxCols = grid[0].length;
    if (row >= 0 && row < maxRows && col >= 0 && col < maxCols) {
        if (!grid[row][col].visited && !grid[row][col].isWall) {
            grid[row][col].distance = currDist + grid[row][col].weight;
            grid[row][col].prevCell = { prevRow, prevCol };
            grid[row][col].visited = true;
            pq.enqueue(new PQElement([row, col], calculateHeuristic(row, col, endRow, endCol)));
        }
    }
}

export default function bestfs(grid, startCell, endCell) {
    const startRow = Number(startCell.row);
    const startCol = Number(startCell.col);
    const endRow = Number(endCell.row);
    const endCol = Number(endCell.col);
    grid[startRow][startCol].distance = 0;
    grid[startRow][startCol].visited = true;
    const visitedOrder = [];
    const pq = new PriorityQueue();
    pq.enqueue(new PQElement([startRow, startCol], 0));
    const indices = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    while (!pq.isEmpty()) {
        var [currRow, currCol] = pq.dequeue();
        var currDist = grid[currRow][currCol].distance;
        visitedOrder.push([currRow, currCol]);
        if (grid[currRow][currCol].isFinish)
            break;
        for (var i = 0; i < indices.length; i++) {
            let ele = indices[i];
            visit(grid, pq, currDist, currRow, currCol, currRow + ele[0], currCol + ele[1], endRow, endCol);
        }
    }
    const shortestPathInReverse = [];
    currRow = endRow;
    currCol = endCol;
    while (true) {
        shortestPathInReverse.push([currRow, currCol]);
        if (grid[currRow][currCol].prevCell === null)
            break;
        const { prevRow, prevCol } = grid[currRow][currCol].prevCell;
        currRow = prevRow;
        currCol = prevCol;
    }
    return [visitedOrder, shortestPathInReverse];
}