
function getMinMove(start: string, target: string, brokenTiles: string[]): number {
    let ans = 0;

    const board = 8;

    const moves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1],
    ];

    const position = (pos: string): [number, number] => {
        const x = pos.charCodeAt(0) - "a".charCodeAt(0);
        const y = parseInt(pos[1]) - 1;
        return [x, y];
    };

    const checkBoard = (x: number, y: number) => x >= 0 && x < board && y >= 0 && y < board;

    const makeLowercase = new Set(brokenTiles.map(tile => tile.toLowerCase()));

    const setPosition = new Set<string>();

    const [startX, startY] = position(start);
    const [targetX, targetY] = position(target);

    const queue: [number, number, number][] = [[startX, startY, 0]];

    while (queue.length > 0) {
        const [x, y, move] = queue.shift()!;
        const key = `${x}, ${y}`;
        if (setPosition.has(key)) continue;
        setPosition.add(key);

        if (x === targetX && y === targetY) {
            ans = move; // เจอเป้าหมายแล้ว บันทึกคำตอบลง ans
            break; // ออกจากลูปได้เลย
        }

        for (const [dx, dy] of moves) {
            const [nx, ny] = [x + dx, y + dy];
            const pos = String.fromCharCode(nx + 97) + (ny + 1);
            if (checkBoard(nx, ny) && !makeLowercase.has(pos)) {
                queue.push([nx, ny, move + 1]);
            }
        }
    }

    return ans;
}

const ans = getMinMove('d6', 'h8', ['f6', 'f7']);
console.log(ans);