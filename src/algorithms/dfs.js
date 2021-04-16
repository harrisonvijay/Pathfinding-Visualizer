import Stack from "../datastructures/Stack.js";

function visit(grid, stack, nextDist, prevRow, prevCol, row, col) {
    const maxRows = grid.length;
    const maxCols = grid[0].length;
    if (row >= 0 && row < maxRows && col >= 0 && col < maxCols) {
        if (!grid[row][col].visited && !grid[row][col].isWall) {
            grid[row][col].distance = nextDist;
            grid[row][col].prevCell = { prevRow, prevCol };
            stack.push([row, col]);
        }
    }
}

export default function dfs(grid, startCell, endCell) {
    const startRow = Number(startCell.row);
    const startCol = Number(startCell.col);
    const endRow = Number(endCell.row);
    const endCol = Number(endCell.col);
    grid[startRow][startCol].distance = 0;
    const visitedOrder = [];
    const stack = new Stack();
    stack.push([startRow, startCol]);
    const indices = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    indices.reverse();
    while (!stack.isEmpty()) {
        var [currRow, currCol] = stack.pop();
        var currDist = grid[currRow][currCol].distance;
        var nextDist = currDist + 1;
        if (grid[currRow][currCol].visited)
            continue;
        grid[currRow][currCol].visited = true;
        visitedOrder.push([currRow, currCol]);
        if (grid[currRow][currCol].isFinish)
            break;
        for (var i = 0; i < indices.length; i++) {
            let ele = indices[i];
            visit(grid, stack, nextDist, currRow, currCol, currRow + ele[0], currCol + ele[1])
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