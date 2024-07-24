document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameMessage = document.getElementById('game-message');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every(cell => cell);
    };

    const handleCellClick = (event) => {
        const index = event.target.getAttribute('data-index');
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            gameMessage.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            gameMessage.textContent = 'It\'s a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameMessage.textContent = `Player ${currentPlayer}'s turn`;
    };

    const resetGame = () => {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        gameMessage.textContent = `Player X's turn`;
        currentPlayer = 'X';
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    gameMessage.textContent = `Player X's turn`;
});
